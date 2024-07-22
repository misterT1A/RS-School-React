import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IPlanet } from '../types/rootTypes';

interface IInitialState {
  planets: IPlanet[];
}

const initialState: IInitialState = {
  planets: [],
};

const favoritSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<IPlanet>) {
      state.planets.push(action.payload);
    },
    deleteFavorite(state, action: PayloadAction<IPlanet>) {
      state.planets = state.planets.filter((favorite) => favorite.name !== action.payload.name) && [];
    },
  },
});

export const { addFavorite, deleteFavorite } = favoritSlice.actions;
export default favoritSlice.reducer;
