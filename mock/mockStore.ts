import { configureStore } from '@reduxjs/toolkit';

import favoriteReducer from '@/store/favoriteSlice';

const mockStore = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});

export default mockStore;
