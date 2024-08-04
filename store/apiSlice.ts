import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import type store from './store';
import type { IPlanet, IResponse, ISearchParams } from '../types/rootTypes';

type RootState = ReturnType<ReturnType<typeof store>['getState']>;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  extractRehydrationInfo(action, { reducerPath }): RootState {
    if (action.type === HYDRATE) {
      return (action.payload as RootState)[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getPlanets: builder.query<IResponse, ISearchParams>({
      query: ({ searchValue, pageNumber }) => `planets/?search=${searchValue}&page=${pageNumber}`,
    }),
    getPlanet: builder.query<IPlanet, string>({
      query: (searchValue) => `planets/${searchValue}`,
    }),
  }),
});

export const { useGetPlanetsQuery, useGetPlanetQuery } = apiSlice;
