import type {IMovie, IMovieResponse} from "../../models/IMovie.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {type GetMoviesParams, movieService} from "../../services/api.movieService.ts";

interface MoviesState {
    items: IMovie[];
    current: IMovie | null;
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    selectedGenreId?: number;
    query: string;
    language: string;
}

const initialState: MoviesState = {
    items: [],
    current: null,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    selectedGenreId: undefined,
    query: "",
    language: "en-US",
};

export const loadMovies = createAsyncThunk<IMovieResponse, GetMoviesParams>(
    "loadMovies",
    async (params) => {
        return  await movieService.getMovies(params);

    }
);

export const loadMovieById = createAsyncThunk<IMovie, { id: number; language?: string }>(
    "loadMovieById",
    async ({ id, language }) => {
        return await movieService.getMovieById(id, language);
    }
);

export const movieSlice = createSlice({
    name: "movieStoreSlice",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setGenre(state, action: PayloadAction<number | undefined>) {
            state.selectedGenreId = action.payload;
        },
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setLanguage(state, action: PayloadAction<string>) {
            state.language = action.payload;
        },
        clearCurrent(state) {
            state.current = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMovies.fulfilled, (state, action:PayloadAction<IMovieResponse>) => {
                state.loading = false;
                state.items = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(loadMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Movies loading error";
            })
            .addCase(loadMovieById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMovieById.fulfilled, (state, action:PayloadAction<IMovie>) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(loadMovieById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Movie loading error";
            });
    },
});

export const movieActions = {...movieSlice.actions, loadMovies, loadMovieById}
