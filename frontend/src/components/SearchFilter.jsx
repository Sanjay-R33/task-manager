export default function SearchFilter({
  search,
  setSearch,
  statusFilter,
  filterTasks,
  openModal,
}) {
  return (
    <section className="toolbar">
      <input
        className="search-input"
        placeholder="Search by title or description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="status-filter"
        value={statusFilter}
        onChange={(e) => filterTasks(e.target.value)}
      >
        <option value="active">Todo + Progress</option>
        <option value="todo">Todo</option>
        <option value="progress">Progress</option>
        <option value="done">Done</option>
      </select>

      <button className="primary-btn" onClick={openModal}>
        + Add Task
      </button>
    </section>
  );
}