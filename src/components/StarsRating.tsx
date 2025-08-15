import type {FC} from "react";

interface StarsRatingProps {
    rating: number;
}

export const StarsRating: FC<StarsRatingProps> = ({ rating }) => {
    const fullStars = Math.round(rating / 2);

    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <span
                    key={i}
                    className={i < fullStars ? "text-yellow-500" : "text-gray-300"}
                >
                    ★
                </span>
            ))}
            <span className="text-gray-600 text-sm">({rating.toFixed(1)})</span>
        </div>
    );
};
