import type {IMovie} from "../models/IMovie.ts";
import type {FC} from "react";
import {MoviesListCard} from "./MoviesListCard.tsx";

interface MoviesListProps {
    movies: IMovie[];
}

export const MoviesList:FC<MoviesListProps> = ({ movies }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map(movie => (
                <MoviesListCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};
