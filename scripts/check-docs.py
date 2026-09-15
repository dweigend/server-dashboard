"""Check concept links, JSON references and the complete mockup inventory."""

import hashlib
import json
import re
import struct
from collections import Counter
from pathlib import Path
from urllib.parse import unquote, urlsplit


def check() -> None:
    root = Path(__file__).resolve().parents[1]
    errors: list[str] = []
    documents = [
        p
        for p in root.rglob("*.md")
        if not any(part in {".git", ".local", "node_modules"} for part in p.parts)
    ]
    for document in documents:
        content = re.sub(r"```.*?```", "", document.read_text(), flags=re.S)
        for target in re.findall(r"\]\(([^)]+)\)", content):
            target = target.strip("<>")
            parsed = urlsplit(target)
            if parsed.scheme or not parsed.path:
                continue
            if not (document.parent / unquote(parsed.path)).exists():
                errors.append(f"Broken link: {document.relative_to(root)} -> {target}")

    contract = json.loads((root / "contracts/openapi.json").read_text())

    def walk(value: object) -> None:
        if isinstance(value, dict):
            if "$ref" in value:
                target = value["$ref"]
                if isinstance(target, str) and target.startswith("#/"):
                    current = contract
                    try:
                        for part in target[2:].split("/"):
                            current = current[
                                part.replace("~1", "/").replace("~0", "~")
                            ]
                    except (KeyError, TypeError):
                        errors.append(f"Unresolved contract reference: {target}")
            for child in value.values():
                walk(child)
        elif isinstance(value, list):
            for child in value:
                walk(child)

    walk(contract)
    json.loads((root / "design/tokens.json").read_text())
    portfolio = root / "design/portfolio"
    manifest = json.loads((portfolio / "manifest.json").read_text())
    expected = {f"{n:02}" for n in range(1, 31)}
    if len(manifest) != 30 or {entry["id"] for entry in manifest} != expected:
        errors.append("Portfolio must contain exactly 30 uniquely numbered entries")
    if {p.stem for p in (portfolio / "images").glob("*.png")} != expected:
        errors.append("Portfolio image files do not match the 30-entry inventory")
    for entry in manifest:
        path = portfolio / entry["file"]
        if not path.is_file():
            errors.append(f"Missing image: {entry['file']}")
            continue
        with path.open("rb") as image:
            header = image.read(24)
        if len(header) < 24 or header[:8] != b"\x89PNG\r\n\x1a\n":
            errors.append(f"Invalid PNG header: {path.name}")
        else:
            width, height = struct.unpack(">II", header[16:24])
            if not 0 < width < height:
                errors.append(f"Expected portrait image: {path.name}")
    design = root / "design"
    inventory = json.loads((design / "image-inventory.json").read_text())
    images = inventory["images"]
    counts = Counter(entry["group"] for entry in images)
    if counts != inventory["expectedCounts"]:
        errors.append("Design image counts do not match the expected inventory")
    listed = {entry["file"] for entry in images}
    actual = {
        str(path.relative_to(design))
        for folder in ("portfolio/images", "references", "stitch/screens")
        for path in (design / folder).iterdir()
        if path.suffix in {".png", ".jpg"}
    }
    if listed != actual or len(listed) != len(images):
        errors.append("Design image inventory has missing, extra or duplicate files")
    for entry in images:
        path = design / entry["file"]
        if not path.is_file():
            errors.append(f"Missing design example: {entry['file']}")
            continue
        content = path.read_bytes()
        if hashlib.sha256(content).hexdigest() != entry["sha256"]:
            errors.append(f"Design image checksum mismatch: {entry['file']}")
        if path.suffix == ".png":
            if len(content) < 24 or content[:8] != b"\x89PNG\r\n\x1a\n":
                errors.append(f"Invalid design PNG: {entry['file']}")
            elif struct.unpack(">II", content[16:24]) != (
                entry["width"],
                entry["height"],
            ):
                errors.append(f"Design image dimension mismatch: {entry['file']}")
        elif not content.startswith(b"\xff\xd8\xff") or not content.endswith(
            b"\xff\xd9"
        ):
            errors.append(f"Invalid design JPEG: {entry['file']}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(
        f"Checked {len(documents)} documents, contract references, "
        f"30 mockups and {len(images)} total design images."
    )


if __name__ == "__main__":
    check()
