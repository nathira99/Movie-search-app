export default function Pagination({ current, total, pageSize, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 mt-6">

      <button
        onClick={() => onPageChange(1)}
        disabled={current === 1}
        className="px-3 py-1 border rounded-lg"
      >
        First
      </button>

      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 border rounded-lg"
      >
        Prev
      </button>

      <span className="px-3 py-1 bg-gray-100 rounded-lg">
        Page {current}
      </span>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === totalPages}
        className="px-3 py-1 border rounded-lg"
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={current === totalPages}
        className="px-3 py-1 border rounded-lg"
      >
        Last
      </button>
    </div>
  );
}
