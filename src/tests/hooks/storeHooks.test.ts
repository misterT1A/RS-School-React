// import { configureStore } from '@reduxjs/toolkit';

// import type { AppDispatch, RootState } from '../../store/store';
// import { renderHook } from '@testing-library/react';

// import { Provider } from 'react';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { apiSlice } from '../../store/apiSlice';
// import detailedReducer from '../store/detailedSlice';
// import favoriteReducer from './favoriteSlice';
// import planetsReducer from './planetsSlice';

// export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// // Создаем mock store с помощью configureStore
// const createMockStore = (initialState: Partial<RootState>) => {
//   return configureStore({
//     reducer: {
//       [apiSlice.reducerPath]: apiSlice.reducer,
//       planets: planetsReducer,
//       planet: detailedReducer,
//       favorite: favoriteReducer,
//     },
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//     preloadedState: initialState,
//   });
// };

// // Пример начального состояния
// const initialState: Partial<RootState> = {
//   planets: {
//     data: 'test data', // Замените на структуру данных, используемую в вашем срезе planets
//   },
//   planet: {
//     details: 'detailed test data', // Замените на структуру данных, используемую в вашем срезе detailed
//   },
//   favorite: {
//     items: ['favorite1', 'favorite2'], // Замените на структуру данных, используемую в вашем срезе favorite
//   },
// };

// describe('useAppDispatch', () => {
//   it('should return the dispatch function from the redux store', () => {
//     const mockStore = createMockStore(initialState);
//     const { result } = renderHook(() => useAppDispatch(), {
//       wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
//     });

//     expect(typeof result.current).toBe('function');
//   });
// });

// describe('useAppSelector', () => {
//   it('should return the selected state from the redux store', () => {
//     const mockStore = createMockStore(initialState);
//     const { result } = renderHook(() => useAppSelector((state) => state.planets.data), {
//       wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
//     });

//     expect(result.current).toBe('test data');
//   });
// });
