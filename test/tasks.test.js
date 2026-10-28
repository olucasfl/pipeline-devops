const test = require("node:test");
const assert = require("node:assert/strict");
const { validateTitle, createTask, moveTask, removeTask, filterTasks, stats } = require("../src/tasks.js");

const meta = { id: "a1", now: 1000 };

test("validateTitle remove espacos e rejeita vazio", () => {
  assert.equal(validateTitle("  estudar  "), "estudar");
  assert.throws(() => validateTitle("   "), /titulo/);
  assert.throws(() => validateTitle(undefined));
});

test("validateTitle rejeita titulo muito longo", () => {
  assert.throws(() => validateTitle("x".repeat(81)), /longo/);
  assert.equal(validateTitle("x".repeat(80)).length, 80);
});

test("createTask cria tarefa em a fazer com prioridade media por padrao", () => {
  const t = createTask({ title: "Deploy" }, meta);
  assert.deepEqual(t, { id: "a1", title: "Deploy", priority: "media", status: "todo", createdAt: 1000 });
});

test("createTask rejeita prioridade invalida", () => {
  assert.throws(() => createTask({ title: "x", priority: "urgente" }, meta), /Prioridade/);
});

test("moveTask muda o status sem alterar a lista original", () => {
  const original = [createTask({ title: "A" }, meta)];
  const moved = moveTask(original, "a1", "doing");
  assert.equal(moved[0].status, "doing");
  assert.equal(original[0].status, "todo");
});

test("moveTask rejeita status e id invalidos", () => {
  const list = [createTask({ title: "A" }, meta)];
  assert.throws(() => moveTask(list, "a1", "limbo"), /Status/);
  assert.throws(() => moveTask(list, "zzz", "done"), /encontrada/);
});

test("removeTask remove so a tarefa pedida", () => {
  const list = [createTask({ title: "A" }, { id: "1", now: 1 }), createTask({ title: "B" }, { id: "2", now: 2 })];
  assert.deepEqual(removeTask(list, "1").map((t) => t.id), ["2"]);
});

test("filterTasks filtra por texto e prioridade", () => {
  const list = [
    createTask({ title: "Escrever testes", priority: "alta" }, { id: "1", now: 1 }),
    createTask({ title: "Configurar pipeline", priority: "baixa" }, { id: "2", now: 2 }),
    createTask({ title: "Revisar testes", priority: "baixa" }, { id: "3", now: 3 }),
  ];
  assert.equal(filterTasks(list, { query: "TESTES", priority: "todas" }).length, 2);
  assert.equal(filterTasks(list, { query: "", priority: "baixa" }).length, 2);
  assert.deepEqual(filterTasks(list, { query: "testes", priority: "baixa" }).map((t) => t.id), ["3"]);
  assert.equal(filterTasks(list).length, 3);
});

test("stats calcula contagens e porcentagem", () => {
  assert.deepEqual(stats([]), { total: 0, todo: 0, doing: 0, done: 0, percentDone: 0 });
  let list = [1, 2, 3].map((n) => createTask({ title: "t" + n }, { id: String(n), now: n }));
  list = moveTask(list, "1", "done");
  const s = stats(list);
  assert.equal(s.done, 1);
  assert.equal(s.todo, 2);
  assert.equal(s.percentDone, 33);
});
