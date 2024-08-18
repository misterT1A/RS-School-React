import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ICountry {
  name: string;
}

export interface ICountriesState {
  countries: ICountry[];
}

const initialState: ICountriesState = {
  countries: [
    { name: 'Uganda' },
    { name: 'Kongo' },
    { name: 'Kemeron' },
    { name: 'Bolivia' },
    { name: 'Nepal' },
    { name: 'Iceland' },
    { name: 'Mongolia' },
    { name: 'Honduras' },
    { name: 'Madagascar' },
    { name: 'Fiji' },
    { name: 'Slovenia' },
    { name: 'Laos' },
    { name: 'Uruguay' },
    { name: 'Morocco' },
    { name: 'Tanzania' },
    { name: 'Jamaica' },
    { name: 'Finland' },
    { name: 'Armenia' },
    { name: 'Peru' },
    { name: 'Ghana' },
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<ICountry[]>) {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countriesSlice.actions;
export default countriesSlice.reducer;
