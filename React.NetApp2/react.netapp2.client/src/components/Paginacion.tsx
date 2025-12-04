import type { FiltrosType } from "../utils/filtros";

type PaginacionProps = {
  filtros: FiltrosType;
  setFiltros: (value: FiltrosType) => void;
  getContactos: (value: FiltrosType | null) => void;
};

export function Paginacion({
  filtros,
  setFiltros,
  getContactos,
}: PaginacionProps) {
  const pageNumbers = Array.from(
    { length: filtros.TotalPages },
    (_, index) => index + 1
  );
  const handleClick = (page: number) => {
    const newFiltros = { ...filtros, Page: page };
    setFiltros(newFiltros);
    getContactos(newFiltros);
  };
  const handleChange = (event) => {
    const newFiltros = { ...filtros, PageSize: parseInt(event.target.value) };
    setFiltros(newFiltros);
    console.log(newFiltros);
    getContactos(newFiltros);
  };

  return (
    <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handleClick(filtros.Page - 1)}
          className={`${
            filtros.Page === 1 ? "invisible" : ""
          } relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10`}
        >
          Previous
        </button>

        <button
          onClick={() => handleClick(filtros.Page + 1)}
          className={` relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md"
          >
            <button
              onClick={() => handleClick(1)}
              disabled={filtros.Page === 1}
              className={` relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-sky-300 ${
                filtros.Page !== 1 ? "hover:bg-white/5" : "cursor-not-allowed"
              } focus:z-20 focus:outline-offset-0`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>

              <span className="sr-only">Start</span>
            </button>
            <button
              onClick={() => handleClick(filtros.Page - 1)}
              disabled={filtros.Page === 1}
              className={` relative inline-flex items-center  px-2 py-2 text-gray-400 inset-ring inset-ring-sky-300 ${
                filtros.Page !== 1 ? "hover:bg-white/5" : "cursor-not-allowed"
              } focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <button
              key={`page${filtros.Page}`}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-sky-300 hover:bg-white/5 focus:z-20 focus:outline-offset-0 bg-sky-600 hover:bg-sky-600 focus-visible:outline-sky-300`}
            >
              {filtros.Page}
            </button>
            <button
              onClick={() => handleClick(filtros.Page + 1)}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 inset-ring inset-ring-sky-300 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                data-slot="icon"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => handleClick(filtros.TotalPages)}
              disabled={filtros.Page === filtros.TotalPages}
              className={` relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-sky-300 ${
                filtros.Page !== filtros.TotalPages
                  ? "hover:bg-white/5"
                  : "cursor-not-allowed"
              } focus:z-20 focus:outline-offset-0`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
              <span className="sr-only">End</span>
            </button>
          </nav>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center max-w-20 mx-3">
          <select
            onChange={handleChange}
            className="px-4 py-1.5 text-gray-200 inset-ring inset-ring-sky-300 rounded-md hover:bg-white/5"
          >
            <option value={5} selected={filtros.PageSize === 5}>
              5
            </option>
            <option value={10} selected={filtros.PageSize === 10}>
              10
            </option>
            <option value={20} selected={filtros.PageSize === 20}>
              20
            </option>
            <option value={50} selected={filtros.PageSize === 50}>
              50
            </option>
            <option value={100} selected={filtros.PageSize === 100}>
              100
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
