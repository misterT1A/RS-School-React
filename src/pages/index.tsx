import type { UnknownAction } from '@reduxjs/toolkit';
import type { ReactElement } from 'react';

import Root from '@/components/root/Root';
import { apiSlice } from '@/store/apiSlice';
import { wrapper } from '@/store/store';
import type { ISearchParams } from '@/types/rootTypes';

const Home = (): ReactElement => <Root />;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { q = '', page = 1, details } = context.query;
  const stateSearch: ISearchParams = { searchValue: q.toString(), pageNumber: +page };
  store.dispatch(apiSlice.endpoints.getPlanets.initiate(stateSearch) as unknown as UnknownAction);
  if (details) {
    store.dispatch(apiSlice.endpoints.getPlanet.initiate(details.toString()) as unknown as UnknownAction);
  }

  await Promise.all(
    store.dispatch(apiSlice.util.getRunningQueriesThunk() as unknown as UnknownAction) as unknown as unknown[],
  );

  return {
    props: {},
  };
});

export default Home;
