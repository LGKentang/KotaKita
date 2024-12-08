'use client';

type PaginationProps = {
  items: number;
  pageSize: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onChangePage,
}: PaginationProps) {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className="mt-5 flex gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChangePage(page)} // Call onChangePage with the selected page
          className={`rounded px-3 py-1 ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
