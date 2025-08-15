import { GenreBadge } from "./GenreBadge";
import type {IMovie} from "../models/IMovie.ts";
import type {FC} from "react";

interface MovieInfoProps {
    movie: IMovie;
}

export const MovieInfo: FC<MovieInfoProps> = ({ movie }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            {movie.release_date && <p className="text-sm text-gray-500 mt-1">Дата релиза: {movie.release_date}</p>}
            <div className="mt-3 text-yellow-600 font-semibold">★ {movie.vote_average.toFixed(1)}</div>

            <div className="mt-4 flex flex-wrap gap-2">
                {movie.genre_ids?.map(id => <GenreBadge key={id} genreId={id} />)}
            </div>

            {movie.overview && <p className="mt-6 leading-7">{movie.overview}</p>}
        </div>
    );
};
