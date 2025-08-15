import axios from "axios";
import type {IMovie, IMovieResponse} from "../models/IMovie.ts";
const token:string = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${token}` },
});


export interface GetMoviesParams {
    page?: number;
    genreId?: number;
    query?: string;
    language?: string;
}

export interface MovieQueryParams{
    page?: number;
    query?: string;
    language?: string;
    with_genres?: number;
}
export const movieService = {
    async getMovies({ page = 1, genreId, query, language = "en-US" }: GetMoviesParams): Promise<IMovieResponse> {
        const params: MovieQueryParams = {page, language};

        if (genreId) {params.with_genres = genreId}

        if (query) {
            params.query = query;
            const res = await axiosInstance.get<IMovieResponse>("/search/movie", { params });
            return res.data;
        }

        const res = await axiosInstance.get<IMovieResponse>("/discover/movie", { params });
        return res.data;
    },

    async getMovieById(id: number, language = "en-US"): Promise<IMovie> {
        const res = await axiosInstance.get<IMovie>(`/movie/${id}`, { params: { language } });
        return res.data;
    },
};