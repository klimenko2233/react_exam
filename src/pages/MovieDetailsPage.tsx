import {type FC, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { movieActions } from "../redux/slices/movieSlice";
import {MovieInfo} from "../components/MovieInfo.tsx";


export const MovieDetailsPage: FC = () => {
    const { id } = useParams();
    const movieId = Number(id);
    const dispatch = useAppDispatch();
    const { current, loading, error, language } = useAppSelector(s => s.movies);

    useEffect(() => {
        if (movieId) {
            dispatch(movieActions.loadMovieById({ id: movieId, language }));
        }
        return () => { dispatch(movieActions.clearCurrent()); };
    }, [dispatch, movieId, language]);

    if (loading || !current) return <div className="text-center my-10">{loading ? "Загрузка..." : "Нет данных"}</div>;
    if (error) return <div className="text-center text-red-600 my-6">Ошибка: {error}</div>;

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <img
                    src={current.poster_path ? `https://image.tmdb.org/t/p/w500${current.poster_path}` : "/no-poster.png"}
                    alt={current.title}
                    className="rounded-xl shadow"
                />
                <Link to="/" className="inline-block mt-4 text-indigo-600 hover:underline">
                    ← Назад к списку
                </Link>
            </div>

            <div className="md:col-span-2">
                <MovieInfo movie={current} />
            </div>
        </div>
    );
};
