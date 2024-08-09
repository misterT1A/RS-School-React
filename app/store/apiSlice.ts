import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IPlanet, IResponse, ISearchParams } from '../types/rootTypes';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
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
