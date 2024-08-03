import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IPlanet } from '../types/rootTypes';
import filterPlanet from '../utils/filterPlanet';

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
      const filteredData = Object.fromEntries(filterPlanet(action.payload)) as unknown as IPlanet;
      state.planets.push(filteredData);
    },
    deleteFavorite(state, action: PayloadAction<IPlanet>) {
      state.planets = state.planets.filter((favorite) => favorite.name !== action.payload.name);
    },
    deleteAllFavorites(state) {
      state.planets = [];
    },
  },
});

export const { addFavorite, deleteFavorite, deleteAllFavorites } = favoritSlice.actions;
export default favoritSlice.reducer;
