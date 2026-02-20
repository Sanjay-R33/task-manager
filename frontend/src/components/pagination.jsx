export default function Pagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="pagination-wrap">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="page-indicator">Page {page} of {totalPages}</span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}