(function () {
  const store = window.localStorage;
  let tasks = loadTasks(store);
  let filter = { query: "", priority: "todas" };

  const form = document.getElementById("form");
  const titleInput = document.getElementById("title");
  const priorityInput = document.getElementById("priority");
  const searchInput = document.getElementById("search");
  const filterInput = document.getElementById("filter-priority");
  const errorBox = document.getElementById("error");
  const exportBtn = document.getElementById("export");
  const progress = document.getElementById("progress");
  const progressText = document.getElementById("progress-text");
  const labels = { todo: "A fazer", doing: "Fazendo", done: "Feito" };

  function persist() {
    saveTasks(store, tasks);
    render();
  }

  function newId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function card(task) {
    const li = document.createElement("li");
    li.className = "card prio-" + task.priority;

    const title = document.createElement("span");
    title.className = "card-title";
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = task.priority;

    const actions = document.createElement("div");
    actions.className = "card-actions";
    STATUSES.filter((s) => s !== task.status).forEach((s) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = labels[s];
      b.addEventListener("click", () => {
        tasks = moveTask(tasks, task.id, s);
        persist();
      });
      actions.appendChild(b);
    });
    const del = document.createElement("button");
    del.type = "button";
    del.className = "danger";
    del.textContent = "Excluir";
    del.addEventListener("click", () => {
      tasks = removeTask(tasks, task.id);
      persist();
    });
    actions.appendChild(del);

    li.append(title, badge, actions);
    return li;
  }

  function render() {
    const visible = filterTasks(tasks, filter);
    STATUSES.forEach((status) => {
      const list = document.getElementById("list-" + status);
      list.replaceChildren(...visible.filter((t) => t.status === status).map(card));
      document.getElementById("count-" + status).textContent = String(tasks.filter((t) => t.status === status).length);
    });
    const s = stats(tasks);
    progress.value = s.percentDone;
    progressText.textContent = s.done + " de " + s.total + " concluidas (" + s.percentDone + "%)";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const task = createTask({ title: titleInput.value, priority: priorityInput.value }, { id: newId(), now: Date.now() });
      tasks = tasks.concat(task);
      errorBox.textContent = "";
      titleInput.value = "";
      persist();
    } catch (err) {
      errorBox.textContent = err.message;
    }
  });

  searchInput.addEventListener("input", () => {
    filter = { query: searchInput.value, priority: filter.priority };
    render();
  });

  filterInput.addEventListener("change", () => {
    filter = { query: filter.query, priority: filterInput.value };
    render();
  });

  exportBtn.addEventListener("click", () => {
    const blob = new Blob([exportTasks(tasks)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tarefas.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  render();
})();
