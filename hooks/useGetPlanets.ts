import { useRouter } from 'next/router';
import type React from 'react';
import { useEffect, useMemo } from 'react';

// import { useSearchParams } from 'react-router-dom';
import { getCurrentPage, getMaxPage } from '@/utils/root-helpers';

import { useAppDispatch } from './storeHooks';
import { useGetPlanetsQuery } from '../store/apiSlice';
import { setPlanets } from '../store/planetsSlice';
import type { IPageState, IResponse, ISearchParams } from '../types/rootTypes';

type useGetPlanet = (
  setPageState: React.Dispatch<React.SetStateAction<IPageState>>,
) => [IResponse | undefined, boolean, boolean, boolean];

const useGetPlanets: useGetPlanet = (setPageState) => {
  const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  const router = useRouter();
  const fetchParam: ISearchParams = useMemo(() => {
    const { q } = router.query;
    const searchValue = Array.isArray(q) ? q.join(',') : q || '';

    return {
      searchValue,
      pageNumber: Number(router.query.page) || 1,
    };
  }, [router]);

  const { data, isLoading, isFetching, isError } = useGetPlanetsQuery(fetchParam);

  useEffect(() => {
    if (data?.results) {
      // console.log(data?.results);
      dispatch(setPlanets(data.results));
      setPageState((prev) => ({ ...prev, currentPage: getCurrentPage(data), maxPage: getMaxPage(data.count) }));
    }
  }, [data, dispatch, setPageState]);

  return [data, isLoading, isFetching, isError];
};

export default useGetPlanets;
