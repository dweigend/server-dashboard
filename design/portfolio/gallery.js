const pictures = [
	{
		id: "01",
		direction: "Redaktion",
		title: "Magazin",
		category: "magazine",
		file: "images/01.png",
	},
	{
		id: "02",
		direction: "Redaktion",
		title: "Artikel lesen",
		category: "reading",
		file: "images/02.png",
	},
	{
		id: "03",
		direction: "Redaktion",
		title: "Synchron hören",
		category: "audio",
		file: "images/03.png",
	},
	{
		id: "04",
		direction: "Redaktion",
		title: "Text markieren",
		category: "selection",
		file: "images/04.png",
	},
	{
		id: "05",
		direction: "Redaktion",
		title: "Quelle prüfen",
		category: "sources",
		file: "images/05.png",
	},
	{
		id: "06",
		direction: "Redaktion",
		title: "Leseansicht anpassen",
		category: "settings",
		file: "images/06.png",
	},
	{
		id: "07",
		direction: "Redaktion",
		title: "Hörliste",
		category: "audio",
		file: "images/07.png",
	},
	{
		id: "08",
		direction: "Redaktion",
		title: "Recherche aus Artikel",
		category: "task",
		file: "images/08.png",
	},
	{
		id: "09",
		direction: "Redaktion",
		title: "Gespeicherte Passagen",
		category: "selection",
		file: "images/09.png",
	},
	{
		id: "10",
		direction: "Redaktion",
		title: "Morgenlage und Notiz",
		category: "home",
		file: "images/10.png",
	},
	{
		id: "11",
		direction: "Direkt",
		title: "Schnellnotiz",
		category: "note",
		file: "images/11.png",
	},
	{
		id: "12",
		direction: "Direkt",
		title: "Sprache aufnehmen",
		category: "voice",
		file: "images/12.png",
	},
	{
		id: "13",
		direction: "Direkt",
		title: "Transkript korrigieren",
		category: "voice",
		file: "images/13.png",
	},
	{
		id: "14",
		direction: "Direkt",
		title: "Foto mit Notiz",
		category: "photo",
		file: "images/14.png",
	},
	{
		id: "15",
		direction: "Direkt",
		title: "Recherche eingeben",
		category: "task",
		file: "images/15.png",
	},
	{
		id: "16",
		direction: "Direkt",
		title: "Auftragsdetails öffnen",
		category: "task",
		file: "images/16.png",
	},
	{
		id: "17",
		direction: "Direkt",
		title: "Jobs laufen",
		category: "jobs",
		file: "images/17.png",
	},
	{
		id: "18",
		direction: "Direkt",
		title: "Rückfrage beantworten",
		category: "jobs",
		file: "images/18.png",
	},
	{
		id: "19",
		direction: "Direkt",
		title: "Ergebnis weiterverwenden",
		category: "result",
		file: "images/19.png",
	},
	{
		id: "20",
		direction: "Direkt",
		title: "Offline weiterschreiben",
		category: "note",
		file: "images/20.png",
	},
	{
		id: "21",
		direction: "Linie",
		title: "Fokusstart mit Aufklappen",
		category: "home",
		file: "images/21.png",
	},
	{
		id: "22",
		direction: "Linie",
		title: "Notiz zu Aufgabe",
		category: "note",
		file: "images/22.png",
	},
	{
		id: "23",
		direction: "Linie",
		title: "Quellenvergleich im Detail",
		category: "sources",
		file: "images/23.png",
	},
	{
		id: "24",
		direction: "Linie",
		title: "Ergebnis mit Folgefrage",
		category: "result",
		file: "images/24.png",
	},
	{
		id: "25",
		direction: "Linie",
		title: "Sicherung prüfen",
		category: "operations",
		file: "images/25.png",
	},
	{
		id: "26",
		direction: "Linie",
		title: "Fehler gezielt beheben",
		category: "operations",
		file: "images/26.png",
	},
	{
		id: "27",
		direction: "Linie",
		title: "Budgetgrenze behandeln",
		category: "operations",
		file: "images/27.png",
	},
	{
		id: "28",
		direction: "Linie",
		title: "Betrieb kompakt",
		category: "operations",
		file: "images/28.png",
	},
	{
		id: "29",
		direction: "Linie",
		title: "Zugang",
		category: "access",
		file: "images/29.png",
	},
	{
		id: "30",
		direction: "Linie",
		title: "Einstellungen im Kontext",
		category: "settings",
		file: "images/30.png",
	},
];
const storageKey = "dashboard-portfolio-30-favorites";
const gallery = document.querySelector("#gallery");
const category = document.querySelector("#category");
const favoritesOnly = document.querySelector("#favorites-only");
const viewer = document.querySelector("#viewer");
const status = document.querySelector("#selection-status");
let direction = "Alle";
let visible = pictures;
let currentId = null;
let saved = [];
try {
	saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
} catch {
	saved = [];
}
const favorites = new Set(
	Array.isArray(saved)
		? saved.filter((id) => pictures.some((p) => p.id === id))
		: [],
);
function persistFavorites() {
	try {
		localStorage.setItem(storageKey, JSON.stringify([...favorites]));
	} catch {
		status.textContent = "Merkliste bleibt für diese Sitzung erhalten.";
	}
}
function toggleFavorite(id) {
	if (favorites.has(id)) favorites.delete(id);
	else favorites.add(id);
	persistFavorites();
	render();
	updateViewerFavorite();
}
function updateViewerFavorite() {
	const button = document.querySelector("#viewer-favorite");
	const selected = favorites.has(currentId);
	button.textContent = selected ? "Gemerkt" : "Merken";
	button.setAttribute("aria-pressed", String(selected));
}
function openPicture(id) {
	const picture = pictures.find((p) => p.id === id);
	if (!picture) return;
	currentId = id;
	document.querySelector("#viewer-title").textContent =
		`${id} · ${picture.title} · ${picture.direction}`;
	const img = document.querySelector("#viewer-image");
	img.src = picture.file;
	img.alt = `${picture.title} – ${picture.direction}`;
	document.querySelector("#original").href = picture.file;
	updateViewerFavorite();
	if (!viewer.open) viewer.showModal();
}
function movePicture(offset) {
	const index = visible.findIndex((p) => p.id === currentId);
	if (!visible.length) return;
	const nextIndex = (index + offset + visible.length) % visible.length;
	openPicture(visible[nextIndex].id);
}
function render() {
	visible = pictures.filter(
		(p) =>
			(direction === "Alle" || p.direction === direction) &&
			(category.value === "all" || p.category === category.value) &&
			(!favoritesOnly.checked || favorites.has(p.id)),
	);
	gallery.replaceChildren();
	for (const picture of visible) {
		const article = document.createElement("article");
		article.className = "card";
		const imageButton = document.createElement("button");
		imageButton.type = "button";
		imageButton.className = "image-button";
		imageButton.setAttribute(
			"aria-label",
			`${picture.id} ${picture.title} vergrößern`,
		);
		const img = document.createElement("img");
		img.src = picture.file;
		img.alt = `${picture.title} – ${picture.direction}`;
		img.loading = "lazy";
		img.decoding = "async";
		imageButton.append(img);
		imageButton.addEventListener("click", () => openPicture(picture.id));
		const caption = document.createElement("div");
		caption.className = "card-caption";
		const description = document.createElement("p");
		const number = document.createElement("span");
		number.className = "number";
		number.textContent = picture.id;
		description.append(number, document.createTextNode(picture.title));
		const detail = document.createElement("small");
		detail.textContent = picture.direction;
		description.append(detail);
		const favorite = document.createElement("button");
		favorite.type = "button";
		favorite.className = "favorite-button";
		favorite.textContent = favorites.has(picture.id) ? "Gemerkt" : "Merken";
		favorite.setAttribute(
			"aria-label",
			picture.id +
				" " +
				picture.title +
				(favorites.has(picture.id) ? " aus Merkliste entfernen" : " merken"),
		);
		favorite.setAttribute("aria-pressed", String(favorites.has(picture.id)));
		favorite.addEventListener("click", () => toggleFavorite(picture.id));
		caption.append(description, favorite);
		article.append(imageButton, caption);
		gallery.append(article);
	}
	document.querySelector("#count").textContent =
		`${visible.length} von 30 Bildern`;
	document.querySelector("#empty").hidden = visible.length !== 0;
	status.textContent = favorites.size
		? `${[...favorites].sort().join(", ")} gemerkt`
		: "";
}
for (const button of document.querySelectorAll("[data-direction]")) {
	button.addEventListener("click", () => {
		direction = button.dataset.direction;
		for (const tab of document.querySelectorAll("[data-direction]"))
			tab.setAttribute("aria-pressed", String(tab === button));
		render();
	});
}
category.addEventListener("change", render);
favoritesOnly.addEventListener("change", render);
document
	.querySelector("#close")
	.addEventListener("click", () => viewer.close());
document
	.querySelector("#previous")
	.addEventListener("click", () => movePicture(-1));
document.querySelector("#next").addEventListener("click", () => movePicture(1));
document.querySelector("#viewer-favorite").addEventListener("click", () => {
	if (currentId) toggleFavorite(currentId);
});
viewer.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		event.preventDefault();
		movePicture(-1);
	}
	if (event.key === "ArrowRight") {
		event.preventDefault();
		movePicture(1);
	}
});
document.querySelector("#export").addEventListener("click", async () => {
	if (!favorites.size) {
		status.textContent = "Zuerst Bilder merken.";
		return;
	}
	const selection = pictures
		.filter((p) => favorites.has(p.id))
		.map((p) => `${p.id} – ${p.title} (${p.direction})`)
		.join("\n");
	try {
		await navigator.clipboard.writeText(selection);
		status.textContent = "Auswahl kopiert.";
	} catch {
		window.prompt("Auswahl kopieren:", selection);
	}
});
render();
