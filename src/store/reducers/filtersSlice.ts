import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface IFilters {
  platform?: string;
  sortBy?: 'alphabetical' | 'release-date' | 'popularity' | 'relevance' | '';
  genre?: string;
  allPlatforms: string[];
  allGenres: string[];
}

const initialState: IFilters = {
  allPlatforms: [],
  allGenres: [],
};

export const gamesFilters = createSlice({
  name: 'famesFilters',
  initialState,
  reducers: {
    setPlatform: (state, action: PayloadAction<string>) => {
      state.genre = undefined;
      state.sortBy = undefined;
      state.platform = action.payload;
    },
    setSorting: (state, action: PayloadAction<IFilters["sortBy"]>) => {
      state.genre = undefined;
      state.sortBy = action.payload;
      state.platform = undefined;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.sortBy = undefined;
      state.platform = undefined;
    },
    cleaFilters: (state) => {
      state.genre = undefined;
      state.sortBy = undefined;
      state.platform = undefined;
    },
    setAllPlatforms: (state, action: PayloadAction<string[]>) => {
      state.allPlatforms = action.payload;
    },
    setAllGenres: (state, action: PayloadAction<string[]>) => {
      state.allGenres = action.payload;
    }
  },
});

export const {
  setGenre,
  setPlatform,
  setSorting,
  cleaFilters,
  setAllGenres,
  setAllPlatforms,
} = gamesFilters.actions;

export const getFiltersState = (state: RootState) => state;

export default gamesFilters.reducer;
