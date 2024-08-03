import { apiSlice } from '@/store/apiSlice';
import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { q = '', page = 1, details } = context.query;
  const stateSearch = { searchValue: q.toString(), pageNumber: +page };
  store.dispatch(apiSlice.endpoints.getPlanets.initiate(stateSearch));
  if (details) {
    store.dispatch(apiSlice.endpoints.getPlanet.initiate(details.toString()));
  }

  await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
