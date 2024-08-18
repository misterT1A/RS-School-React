import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import countriesReducer from './countriesSlice';
import formsReducer from './formsSlice';

const store = configureStore({
  reducer: {
    forms: formsReducer,
    countries: countriesReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
