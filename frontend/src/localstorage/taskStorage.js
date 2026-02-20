const STORAGE_KEY = "todoapp.tasks.v1";
const PAGE_SIZE = 5;

const seedTasks = [
  {
    id: 1,
    title: "Design dashboard layout",
    description: "Build a clean and responsive task dashboard UI.",
    status: "progress",
    createdAt: "2026-02-18T09:30:00.000Z",
  },
  {
    id: 2,
    title: "Connect localStorage mock",
    description: "Replace backend API calls with localStorage for demo testing.",
    status: "todo",
    createdAt: "2026-02-19T11:15:00.000Z",
  },
  {
    id: 3,
    title: "Finish task actions",
    description: "Ensure add, edit, delete and status changes work correctly.",
    status: "done",
    createdAt: "2026-02-19T16:45:00.000Z",
  },
];

function readTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTasks));
    return [...seedTasks];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function sortByLatest(tasks) {
  return [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTasks({ page = 1, search = "", status = "all" } = {}) {
  const allTasks = sortByLatest(readTasks());

  const filtered = allTasks.filter((task) => {
    const matchesStatus =
      status === "all"
        ? true
        : status === "active"
        ? task.status === "todo" || task.status === "progress"
        : task.status === status;
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const content = filtered.slice(start, start + PAGE_SIZE);

  return {
    content,
    totalPages,
    totalItems: filtered.length,
    page: safePage,
  };
}

export function addTask(data) {
  const tasks = readTasks();
  const maxId = tasks.reduce((max, current) => Math.max(max, Number(current.id) || 0), 0);

  const newTask = {
    id: maxId + 1,
    title: data.title.trim(),
    description: data.description.trim(),
    status: data.status || "todo",
    createdAt: new Date().toISOString(),
  };

  writeTasks([newTask, ...tasks]);
  return newTask;
}

export function updateTask(id, data) {
  const tasks = readTasks();
  const updated = tasks.map((task) => {
    if (task.id !== id) return task;

    return {
      ...task,
      ...(data.title !== undefined ? { title: data.title.trim() } : {}),
      ...(data.description !== undefined
        ? { description: data.description.trim() }
        : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    };
  });

  writeTasks(updated);
}

export function deleteTask(id) {
  const tasks = readTasks();
  writeTasks(tasks.filter((task) => task.id !== id));
}

export function getTaskSummary() {
  const tasks = readTasks();

  return tasks.reduce(
    (summary, task) => {
      summary.total += 1;
      if (task.status === "todo") summary.todo += 1;
      if (task.status === "progress") summary.progress += 1;
      if (task.status === "done") summary.done += 1;
      return summary;
    },
    { total: 0, todo: 0, progress: 0, done: 0 }
  );
}

export function resetTaskStorage() {
  writeTasks(seedTasks);
}
