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
  name: 'uncontrolled',
  initialState,
  reducers: {
    addUncontrolledForm(state, action: PayloadAction<IForm>) {
      state.forms.push(action.payload);
    },
  },
});

export const { addUncontrolledForm } = favoritSlice.actions;
export default favoritSlice.reducer;
