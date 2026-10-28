const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const src = path.join(__dirname, "..", "src");
const html = fs.readFileSync(path.join(src, "index.html"), "utf8");
const app = fs.readFileSync(path.join(src, "app.js"), "utf8");

test("index.html declara idioma, charset, viewport e titulo", () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<meta charset="utf-8">/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /<title>[^<]+<\/title>/);
});

test("todo arquivo referenciado no html existe em src", () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map((m) => m[1]);
  assert.ok(refs.length >= 4);
  refs.forEach((ref) => assert.ok(fs.existsSync(path.join(src, ref)), "arquivo faltando: " + ref));
});

test("os scripts carregam na ordem certa (logica antes da interface)", () => {
  const order = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(order, ["tasks.js", "storage.js", "app.js"]);
});

test("todo id usado pelo app.js existe no html", () => {
  const ids = [...app.matchAll(/getElementById\("([^"]+)"\)/g)].map((m) => m[1]);
  assert.ok(ids.length > 5);
  ids.forEach((id) => assert.ok(html.includes('id="' + id + '"'), "id faltando no html: " + id));
});

test("ids dinamicos das tres colunas existem", () => {
  ["todo", "doing", "done"].forEach((s) => {
    assert.ok(html.includes('id="list-' + s + '"'));
    assert.ok(html.includes('id="count-' + s + '"'));
  });
});
