import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IResponse } from '../types/rootTypes';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<IResponse, void>({
      query: () => 'planets',
    }),
    getPlanet: builder.query<IResponse, string>({
      query: (searchValue) => `planets/${searchValue}`,
    }),
  }),
});

export const { useGetPlanetsQuery, useGetPlanetQuery } = apiSlice;
