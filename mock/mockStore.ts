import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '@/store/apiSlice';
import detailedReducer from '@/store/detailedSlice';
import favoriteReducer from '@/store/favoriteSlice';
import planetsReducer from '@/store/planetsSlice';

const mockStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    planets: planetsReducer,
    planet: detailedReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default mockStore;
