import type {IMovie} from "../models/IMovie.ts";
import {Link} from "react-router-dom";
import type {FC} from "react";
import {PosterPreview} from "./PosterPreview.tsx";
import {GenreBadge} from "./GenreBadge.tsx";
import {StarsRating} from "./StarsRating.tsx";


interface MoviesListCardProps {
    movie: IMovie;
}

export const MoviesListCard:FC<MoviesListCardProps> = ({ movie }) => {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <Link to={`/movie/${movie.id}`}>
                <PosterPreview posterPath={movie.poster_path} title={movie.title} />
            </Link>
            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg truncate">{movie.title}</h3>
                <StarsRating rating={movie.vote_average} />
                <div className="flex flex-wrap gap-2">
                    {movie.genre_ids?.map(id => (
                        <GenreBadge key={id} genreId={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
