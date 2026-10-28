const test = require("node:test");
const assert = require("node:assert/strict");
const { STORAGE_KEY, isValidTask, parseTasks, loadTasks, saveTasks, exportTasks } = require("../src/storage.js");

function fakeStore() {
  const data = {};
  return {
    data: data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = v;
    },
  };
}

const valid = { id: "1", title: "A", priority: "alta", status: "todo" };

test("isValidTask aceita tarefa correta e rejeita lixo", () => {
  assert.equal(isValidTask(valid), true);
  assert.equal(isValidTask(null), false);
  assert.equal(isValidTask({ ...valid, status: "x" }), false);
  assert.equal(isValidTask({ ...valid, id: 5 }), false);
});

test("parseTasks tolera vazio, json quebrado e formato errado", () => {
  assert.deepEqual(parseTasks(null), []);
  assert.deepEqual(parseTasks("{quebrado"), []);
  assert.deepEqual(parseTasks('{"a":1}'), []);
});

test("parseTasks descarta itens invalidos mas mantem os validos", () => {
  const raw = JSON.stringify([valid, { id: 1 }, "texto"]);
  assert.deepEqual(parseTasks(raw), [valid]);
});

test("saveTasks e loadTasks fazem ida e volta", () => {
  const store = fakeStore();
  saveTasks(store, [valid]);
  assert.ok(store.data[STORAGE_KEY]);
  assert.deepEqual(loadTasks(store), [valid]);
});

test("exportTasks gera json com a lista", () => {
  const out = JSON.parse(exportTasks([valid]));
  assert.deepEqual(out.tasks, [valid]);
  assert.ok(out.exportedAt);
});
