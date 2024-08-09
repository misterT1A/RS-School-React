import { useEffect } from 'react';

import { useAppDispatch } from './storeHooks';
import { useGetPlanetQuery } from '../store/apiSlice';
import { setPlanet } from '../store/detailedSlice';
import type { IPlanet } from '../types/rootTypes';

const useGetCurrentPlanet = (productId: string | undefined): [IPlanet | undefined, boolean] => {
  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetPlanetQuery(productId || '');

  useEffect(() => {
    if (data) {
      dispatch(setPlanet(data));
    }
  }, [data, dispatch]);

  return [data, isFetching];
};

export default useGetCurrentPlanet;
