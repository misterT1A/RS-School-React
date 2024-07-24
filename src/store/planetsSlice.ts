import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IPlanet } from '../types/rootTypes';

interface IInitState {
  planets: IPlanet[];
}

const initialState: IInitState = {
  planets: [],
};

const planetsSlice = createSlice({
  name: 'planets',
  initialState,
  reducers: {
    setPlanets(state, action: PayloadAction<IPlanet[]>) {
      state.planets = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(apiSlice.endpoints.getPlanets.matchFulfilled, (state, action: PayloadAction<IResponse>) => {
  //     state.planets = action.payload.results;
  //   });
  // },
});

export const { setPlanets } = planetsSlice.actions;
export default planetsSlice.reducer;
