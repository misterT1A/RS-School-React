import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';
import detailedReducer from './detailedSlice';
import favoriteReducer from './favoriteSlice';
import planetsReducer from './planetsSlice';
import { createWrapper } from 'next-redux-wrapper';

const store = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      planets: planetsReducer,
      planet: detailedReducer,
      favorite: favoriteReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });

// setupListeners(store.dispatch);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<ReturnType<typeof store>['getState']>;
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = ReturnType<typeof store>['dispatch'];
export type AppDispatch = AppStore['dispatch'];
// export const wrapper = createWrapper(store);
export const wrapper = createWrapper<AppStore>(store);
// export const wrapper = createWrapper(store, { debug: true });

export default store;
