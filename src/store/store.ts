import { configureStore } from '@reduxjs/toolkit';

import favoriteReducer from './favoriteSlice';

const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
