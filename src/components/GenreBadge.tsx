import { useAppSelector } from "../redux/store";
import type {FC} from "react";

interface GenreBadgeProps {
    genreId: number;
}

export const GenreBadge:FC<GenreBadgeProps> = ({ genreId }) => {
    const genre = useAppSelector(store =>
        store.genres.items.find(g => g.id === genreId)
    );
    if (!genre) return null;
    return (
        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
            {genre.name}
        </span>
    );
};
