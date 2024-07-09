import type { IResponse, IProduct } from '../types/appTypes';

const fetchData = async (searchValue: string, signal: AbortSignal): Promise<IProduct[]> => {
  const baseUrl = 'https://swapi.dev/api/planets';
  const url = searchValue ? `${baseUrl}/?search=${searchValue.trim()}&page=1` : `${baseUrl}/?page=1`;

  const response = await fetch(url, { signal });
  const data: IResponse = await response.json();
  const upgradeData = data.results.map((elem) => ({ ...elem, id: elem.url }));
  return upgradeData;
};

export default fetchData;
