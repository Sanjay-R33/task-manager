import { useState, useEffect } from "react";

export default function TaskModal({
  isOpen,
  close,
  saveTask,
  editTask,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title || "",
        description: editTask.description || "",
        status: editTask.status || "todo",
      });
      return;
    }

    setForm({ title: "", description: "", status: "todo" });
  }, [editTask, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={close}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>{editTask ? "Edit Task" : "Add Task"}</h3>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {editTask && (
          <select
            className="status-filter"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo">Todo</option>
            <option value="progress">Progress</option>
            <option value="done">Done</option>
          </select>
        )}

        <div className="modal-actions">
          <button
            className="primary-btn"
            onClick={() => saveTask(form)}
            disabled={!form.title.trim() || !form.description.trim()}
          >
            {editTask ? "Update Task" : "Create Task"}
          </button>

          <button className="secondary-btn" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}