import {type ChangeEvent, type FormEvent, useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {getGenres} from "../redux/slices/genreSlice.ts";
import {movieActions} from "../redux/slices/movieSlice.ts";
import type {IGenre} from "../models/IGenre.ts";
import {UserInfo} from "./UserInfo.tsx";

export const Header= ()=>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { items, loading: genresLoading } = useAppSelector(store => store.genres);
    const { selectedGenreId, query, language } = useAppSelector(store => store.movies);

    useEffect(() => {
        if (!items.length) dispatch(getGenres(language));
    }, [language]);

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(movieActions.setQuery(event.target.value));
        dispatch(movieActions.setPage(1));
        if (location.pathname === "/") {
            dispatch(movieActions.loadMovies({ page: 1, query: event.target.value, genreId: selectedGenreId, language }));
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (location.pathname !== "/") {
            navigate("/");
        }
        dispatch(movieActions.loadMovies({ page: 1, query, genreId: selectedGenreId, language }));
    };

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const genreId = event.target.value ? Number(event.target.value) : undefined;
        dispatch(movieActions.setGenre(genreId));
        dispatch(movieActions.setPage(1));
        dispatch(movieActions.loadMovies({ page: 1, query, genreId, language }));
    };

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const lang = event.target.value;
        dispatch(movieActions.setLanguage(lang));
        dispatch(movieActions.loadMovies({ page: 1, query, genreId: selectedGenreId, language: lang }));
        dispatch(getGenres(lang));
    };

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex flex-wrap gap-3 items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">🎬 Movies</Link>

                <form onSubmit={handleSubmit} className="flex-1 flex min-w-[180px]">
                    <input
                        type="text"
                        value={query}
                        onChange={handleQueryChange}
                        placeholder="Search movies..."
                        className="flex-1 rounded-md border px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    />
                </form>

                <select
                    value={selectedGenreId ?? ""}
                    onChange={handleGenreChange}
                    className="rounded-md border px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    disabled={genresLoading}
                >
                    <option value="">Choose genre</option>
                    {items.map((g:IGenre) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="rounded-md border px-3 py-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                >
                    <option value="ru-RU">RU</option>
                    <option value="en-US">EN</option>
                </select>

                <div className="ml-auto">
                    <UserInfo/>
                </div>
            </div>
        </header>
    );
}

