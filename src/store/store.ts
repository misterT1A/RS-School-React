import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import controlledReducer from './controlledSlice';
import countriesReducer from './countriesSlice';
import uncontrolledReducer from './uncontrolledSlice';

const store = configureStore({
  reducer: {
    uncontrolled: uncontrolledReducer,
    controlled: controlledReducer,
    countries: countriesReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
