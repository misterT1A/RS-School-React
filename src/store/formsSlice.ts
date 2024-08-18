import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { IForm, IInitialState } from '../types/storeTypes';

const initialState: IInitialState = {
  forms: [],
};

const favoritSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<IForm>) {
      state.forms.push(action.payload);
    },
  },
});

export const { addForm } = favoritSlice.actions;
export default favoritSlice.reducer;
