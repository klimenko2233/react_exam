import axios from "axios";
import type {IGenre} from "../models/IGenre.ts";

const token: string = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: { Authorization: `Bearer ${token}` },
});

export const genreService = {
    async getGenres(language = "en-US"): Promise<IGenre[]> {
        const res = await axiosInstance.get<{ genres: IGenre[] }>("/genre/movie/list", { params: { language } });
        return res.data.genres;
    },
};
