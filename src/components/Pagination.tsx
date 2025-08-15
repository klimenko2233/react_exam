import type {FC} from "react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onChange: (newPage: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

export const Pagination: FC<PaginationProps> = ({ page, totalPages, onChange }) => {

    const handlePrev = () => onChange(Math.max(1, page - 1));
    const handleNext = () => onChange(Math.min(totalPages, page + 1));

    const getPageNumbers = () => {
        let start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
        const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);


        start = Math.max(1, end - MAX_VISIBLE_PAGES + 1);

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
                Prev
            </button>

            {pages.map(p => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 ${
                        p === page ? "bg-indigo-500 text-white" : "bg-white"
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};
