import { IResponse, IProduct } from '../types/appTypes';

const fetchData = async (searchValue: string, signal: AbortSignal): Promise<IProduct[]> => {
  const baseUrl = 'https://swapi.dev/api/planets';
  const page = '/?page=1';
  const url = searchValue ? `${baseUrl}/?search=${searchValue.trim()}` : baseUrl + page;

  const response = await fetch(url, { signal });
  const data: IResponse = await response.json();
  const upgradeData = data.results.map((elem, index) => ({ ...elem, id: index }));
  return upgradeData;
};

export default fetchData;
