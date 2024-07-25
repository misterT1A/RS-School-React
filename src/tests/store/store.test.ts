// // import { configureStore } from "@reduxjs/toolkit";
// import { RootState } from "../../store/store";
// // import { apiSlice } from "../../store/apiSlice";
// import storeMain from '../store/store.test.ts'

// const createMockStore = (initialState: Partial<RootState>) => {
// //     const store = configureStore({
// //       reducer: {
// //         [apiSlice.reducerPath]: apiSlice.reducer,
// //         planets: planetsReducer,
// //         planet: detailedReducer,
// //         favorite: favoriteReducer,
// //       },
// //       middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
// //       preloadedState: initialState,
// //     });
// //     setupListeners(store.dispatch);
// //     return store;
//     //   };
//     const store = storeMain;

//   const initialState: Partial<RootState> = {
//     planets: {
//       data: 'test data', // Пример начального состояния для planetsReducer
//     },
//     planet: {
//       details: 'detailed test data', // Пример начального состояния для detailedReducer
//     },
//     favorite: {
//       items: ['favorite1', 'favorite2'], // Пример начального состояния для favoriteReducer
//     },
//   };

//   describe('Redux Store', () => {
//     it('should initialize store with correct reducers and middleware', () => {
//       const mockStore = createMockStore(initialState);
//       const { result } = renderHook(() => useAppDispatch(), {
//         wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
//       });

//       expect(typeof result.current).toBe('function');
//     });

//     // it('should select the correct initial state', () => {
//     //   const mockStore = createMockStore(initialState);
//     //   const { result } = renderHook(() => useAppSelector((state) => state.planets.data), {
//     //     wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
//     //   });

//     //   expect(result.current).toBe('test data');
//     // });

//     // it('should update state correctly with dispatch', () => {
//     //   const mockStore = createMockStore(initialState);
//     //   const { result } = renderHook(() => useAppDispatch(), {
//     //     wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
//     //   });

//     //   const dispatch = result.current;

//     //   act(() => {
//     //     dispatch({ type: 'planets/someAction', payload: 'new data' });
//     //   });

//     //   const { result: updatedResult } = renderHook(() => useAppSelector((state) => state.planets.data), {
//     //     wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>,
//     //   });

//     //   expect(updatedResult.current).toBe('new data');
//     // });
//   });
