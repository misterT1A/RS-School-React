import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import type { IPlanet } from '../types/rootTypes';

interface IInitialDetailedPlanet {
  currentPlanet: IPlanet | null;
}

const initialDetailedPlane: IInitialDetailedPlanet = {
  currentPlanet: null,
};

const detailedSlice = createSlice({
  name: 'detailedPlanet',
  initialState: initialDetailedPlane,
  reducers: {
    setPlanet(state, action: PayloadAction<IPlanet>) {
      state.currentPlanet = action.payload;
    },
    deletePlanet(state) {
      state.currentPlanet = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(apiSlice.endpoints.getPlanet.matchFulfilled, (state, action: PayloadAction<IPlanet>) => {
      state.currentPlanet = action.payload;
    });
  },
});

export const { setPlanet, deletePlanet } = detailedSlice.actions;
export default detailedSlice.reducer;
