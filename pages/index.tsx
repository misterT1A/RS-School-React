/* eslint-disable react-refresh/only-export-components */

import { wrapper } from '@/store/store';
import { apiSlice } from '@/store/apiSlice';
import Root from '@/components/root/Root';

const Home = () => {
  return <Root />;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  // const { q = '', page = 1, details } = context.query;
  const { q = '', page = 1 } = context.query;
  const stateSearch = { searchValue: q.toString(), pageNumber: +page };
  store.dispatch(apiSlice.endpoints.getPlanets.initiate(stateSearch));
  // if (details) {
  //   store.dispatch(apiSlice.endpoints.getPlanet.initiate(details.toString()));
  // }

  await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});

export default Home;
