const STORAGE_KEY = "kanban.tasks.v1";

function isValidTask(t) {
  return (
    t !== null &&
    typeof t === "object" &&
    typeof t.id === "string" &&
    typeof t.title === "string" &&
    ["todo", "doing", "done"].includes(t.status) &&
    ["baixa", "media", "alta"].includes(t.priority)
  );
}

function parseTasks(raw) {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isValidTask) : [];
  } catch (e) {
    return [];
  }
}

function loadTasks(store) {
  return parseTasks(store.getItem(STORAGE_KEY));
}

function saveTasks(store, tasks) {
  store.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function exportTasks(tasks) {
  return JSON.stringify({ exportedAt: new Date().toISOString(), tasks: tasks }, null, 2);
}

if (typeof module !== "undefined") {
  module.exports = { STORAGE_KEY, isValidTask, parseTasks, loadTasks, saveTasks, exportTasks };
}
