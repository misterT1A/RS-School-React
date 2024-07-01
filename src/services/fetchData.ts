import { IResponse } from '../types/appTypes';

const fetchData = async (searchValue: string, signal: AbortSignal) => {
  const baseUrl = 'https://swapi.dev/api/planets';
  const url = searchValue ? `${baseUrl}/?search=${searchValue.trim()}` : baseUrl;

  try {
    const response = await fetch(url, { signal });
    const data: IResponse = await response.json();
    const upgradeData = data.results.map((elem, index) => ({ ...elem, id: index }));
    return upgradeData;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.log('Request was aborted');
    } else {
      console.error('Error fetching data:', error);
    }
  }

  return null;
};

export default fetchData;
