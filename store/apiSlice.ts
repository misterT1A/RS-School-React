import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { IPlanet, IResponse, ISearchParams } from '../types/rootTypes';
// import { Action, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// interface IRehydrationPayload {
//   api: {
//     getPlanets: {
//       data: IResponse | undefined;
//       isLoading: boolean;
//     };
//     getPlanet: {
//       data: IPlanet | undefined;
//       isLoading: boolean;
//     };
//   };
// }

// function isHydrateAction(action: Action): action is PayloadAction<RootState> {
//   return action.type === HYDRATE;
// }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  extractRehydrationInfo(action, { reducerPath }) {
    // if (isHydrateAction(action)) {
    //   return action.payload[reducerPath];
    // }
    // return undefined;
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
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
