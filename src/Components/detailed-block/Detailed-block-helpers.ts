import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

import { fetchDetailedService } from '../../services/fetchDataService';
import type { IResponse } from '../../types/rootTypes';

const detailedLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs): Promise<IResponse | undefined> => {
  const { productId } = params;

  if (productId) {
    try {
      const data = await fetchDetailedService(productId);
      return data;
    } catch (error) {
      console.log('Error fetch detailed', error);
    }
  }

  return undefined;
};
export default detailedLoader;
