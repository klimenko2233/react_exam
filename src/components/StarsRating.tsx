import type {FC} from "react";
import StarRatings from "react-star-ratings";


interface StarsRatingProps {
    rating: number;
}

export const StarsRating:FC<StarsRatingProps> = ({ rating }) => {
    return (
        <div className="flex items-center gap-2">
            <StarRatings
                rating={rating / 2}
                starRatedColor="gold"
                starEmptyColor="#d1d5db"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="2px"
                name="rating"
            />
            <span className="text-gray-600 text-sm">({rating.toFixed(1)})</span>
        </div>
    );
};
