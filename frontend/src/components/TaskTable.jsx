import React from "react";

export default function TaskTable({
  tasks = [],
  deleteTask,
  editTask,
  changeStatus,
}) {
  const getStatusClass = (status) => {
    if (status === "done") return "status-pill done";
    if (status === "progress") return "status-pill progress";
    return "status-pill todo";
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-row">
                No tasks found for current filters.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <div className="status-control-wrap">
                    <span className={getStatusClass(task.status)}>{task.status}</span>
                    <select
                      className="table-status-select"
                      value={task.status}
                      onChange={(e) => changeStatus(task.id, e.target.value)}
                    >
                      <option value="todo">Todo</option>
                      <option value="progress">Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </td>

                <td className="action-cell">
                  <button className="edit-btn" onClick={() => editTask(task)}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}