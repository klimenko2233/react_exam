import {createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import type {IGenre} from "../../models/IGenre.ts";
import {genreService} from "../../services/api.genreService.ts";

interface GenresState {
    items: IGenre[];
    loading: boolean;
    error: string | null;
}

const initialState: GenresState = {
    items: [],
    loading: false,
    error: null,
};

export const getGenres = createAsyncThunk<IGenre[], string | undefined>(
    "getGenres",
    async (language) => {
        return await genreService.getGenres(language);
    }
);

export const genreSlice = createSlice({
    name: "genreStoreSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGenres.fulfilled, (state, action: PayloadAction<IGenre[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error loading genres";
            });
    },
});

