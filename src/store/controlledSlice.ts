import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IForm {
  name: string;
  age: string;
  pass: string;
  confirmPass: string;
  gender: string;
  agreement: boolean;
  image: string;
  country: string;
}

interface IInitialState {
  forms: IForm[];
}

const initialState: IInitialState = {
  forms: [],
};

const favoritSlice = createSlice({
  name: 'controlled',
  initialState,
  reducers: {
    addControlledForm(state, action: PayloadAction<IForm>) {
      state.forms.push(action.payload);
    },
  },
});

export const { addControlledForm } = favoritSlice.actions;
export default favoritSlice.reducer;
