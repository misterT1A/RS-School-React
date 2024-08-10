import extractLastNumber from './result-list-helpers';
import type { IResponse } from '../types/rootTypes';

const getCurrentPage = (data: IResponse): number => {
  if (data.next) {
    return +extractLastNumber(data.next) - 1;
  }
  if (data.previous) {
    return +extractLastNumber(data.previous) + 1;
  }

  return 1;
};

const getMaxPage = (count: number): number => {
  if (count <= 10) return 1;
  return count / 10;
};

export { getCurrentPage, getMaxPage };
