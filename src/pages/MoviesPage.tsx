import {type FC, useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { movieActions } from "../redux/slices/movieSlice";
import {MoviesList} from "../components/MoviesList.tsx";
import {Pagination} from "../components/Pagination.tsx";

export const MoviesPage: FC = () => {
    const dispatch = useAppDispatch();
    const { items, page, totalPages, loading, error, selectedGenreId, query, language } =
        useAppSelector(state => state.movies);

    useEffect(() => {
        dispatch(movieActions.loadMovies({ page, genreId: selectedGenreId, query, language }));
    }, [dispatch, page, selectedGenreId, query, language]);

    const handlePageChange = (newPage: number) => {
        dispatch(movieActions.setPage(newPage));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            {loading && <div className="text-center text-gray-500 my-10">Загрузка...</div>}
            {error && <div className="text-center text-red-600 my-6">Ошибка: {error}</div>}

            {!loading && !error && <MoviesList movies={items} />}

            <Pagination
                page={page}
                totalPages={totalPages}
                onChange={handlePageChange}
            />
        </div>
    );
};
