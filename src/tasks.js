const STATUSES = ["todo", "doing", "done"];
const PRIORITIES = ["baixa", "media", "alta"];
const MAX_TITLE = 80;

function validateTitle(title) {
  const clean = String(title || "").trim();
  if (!clean) throw new Error("Digite um titulo para a tarefa");
  if (clean.length > MAX_TITLE) throw new Error("Titulo muito longo (maximo " + MAX_TITLE + ")");
  return clean;
}

function createTask(input, meta) {
  const priority = input.priority || "media";
  if (!PRIORITIES.includes(priority)) throw new Error("Prioridade invalida");
  return {
    id: meta.id,
    title: validateTitle(input.title),
    priority: priority,
    status: "todo",
    createdAt: meta.now,
  };
}

function moveTask(tasks, id, status) {
  if (!STATUSES.includes(status)) throw new Error("Status invalido");
  if (!tasks.some((t) => t.id === id)) throw new Error("Tarefa nao encontrada");
  return tasks.map((t) => (t.id === id ? { ...t, status: status } : t));
}

function removeTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}

function filterTasks(tasks, filter) {
  const query = String((filter && filter.query) || "").trim().toLowerCase();
  const priority = (filter && filter.priority) || "todas";
  return tasks.filter((t) => {
    const matchQuery = !query || t.title.toLowerCase().includes(query);
    const matchPriority = priority === "todas" || t.priority === priority;
    return matchQuery && matchPriority;
  });
}

function stats(tasks) {
  const count = { todo: 0, doing: 0, done: 0 };
  tasks.forEach((t) => {
    count[t.status] += 1;
  });
  const total = tasks.length;
  const percentDone = total === 0 ? 0 : Math.round((count.done / total) * 100);
  return { total: total, todo: count.todo, doing: count.doing, done: count.done, percentDone: percentDone };
}

if (typeof module !== "undefined") {
  module.exports = { STATUSES, PRIORITIES, MAX_TITLE, validateTitle, createTask, moveTask, removeTask, filterTasks, stats };
}
