import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

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
});

export const { setPlanet, deletePlanet } = detailedSlice.actions;
export default detailedSlice.reducer;
