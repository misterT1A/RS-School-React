import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { mockPlanet, mockResponse } from '../../../mock/handlers';
import { apiSlice, useGetPlanetsQuery, useGetPlanetQuery } from '../../store/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

interface IWrapperProps {
  children: ReactNode;
}

const wrapper: React.FC<IWrapperProps> = ({ children }): ReactNode => <Provider store={store}>{children}</Provider>;

describe('apiSlice', () => {
  it('should fetch planets', async () => {
    const { result } = renderHook(() => useGetPlanetsQuery({ searchValue: '', pageNumber: 1 }), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockResponse);
  });

  it('should fetch a single planet', async () => {
    const { result } = renderHook(() => useGetPlanetQuery('1'), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockPlanet);
  });
});
