import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import { handler } from "../build/handler.js";

const server = createServer(handler);
let origin;

before(async () => {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  origin = `http://127.0.0.1:${server.address().port}`;
});

after(
  () =>
    new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
      server.closeAllConnections();
    }),
);

test("production handler serves the German page and its stylesheet", async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="de">/);
  const stylesheet = html.match(/href="([^"]+\.css)"/);
  assert.ok(stylesheet, "SSR must include the compiled stylesheet");
  const css = await fetch(new URL(stylesheet[1], origin));
  assert.equal(css.status, 200);
  assert.match(css.headers.get("content-type"), /text\/css/);
});

test("liveness matches the public contract without caching", async () => {
  const response = await fetch(`${origin}/health/live`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { status: "ok" });
});
