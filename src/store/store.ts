import type { EnhancedStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { apiSlice } from './apiSlice';
import detailedReducer from './detailedSlice';
import favoriteReducer from './favoriteSlice';
import planetsReducer from './planetsSlice';

const store = (): EnhancedStore =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      planets: planetsReducer,
      planet: detailedReducer,
      favorite: favoriteReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export type AppDispatch = ReturnType<typeof store>['dispatch'];
export const wrapper = createWrapper(store);

export default store;
