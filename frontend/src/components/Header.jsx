export default function Header({ summary, resetDemo, testMode }) {
  return (
    <header className="dashboard-header">
      <div className="header-title-wrap">
        <p className="eyebrow">Task Workspace</p>
        <h1>Professional Todo Dashboard</h1>
        {testMode && <span className="mode-badge">Local Test Mode</span>}
      </div>

      <div className="summary-grid">
        <div className="summary-chip total">Total: {summary.total}</div>
        <div className="summary-chip todo">Todo: {summary.todo}</div>
        <div className="summary-chip progress">Progress: {summary.progress}</div>
        <div className="summary-chip done">Done: {summary.done}</div>
      </div>

      {testMode && (
        <button className="secondary-btn" onClick={resetDemo}>
          Reset Demo Data
        </button>
      )}
    </header>
  );
}