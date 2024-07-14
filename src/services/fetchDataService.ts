import type { IResponse } from '../types/rootTypes';

const fetchDataService = async (searchValue: string, pageNumber: number): Promise<IResponse> => {
  const baseUrl = 'https://swapi.dev/api/planets';
  const url = `${baseUrl}/?search=${searchValue ? searchValue.trim() : ''}&page=${pageNumber}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data: IResponse = await response.json();
  return data;
};

const fetchDetailedService = async (searchValue: string): Promise<IResponse | undefined> => {
  if (!searchValue) return undefined;
  const baseUrl = 'https://swapi.dev/api/planets';
  const url = `${baseUrl}/${searchValue.toLocaleLowerCase()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data: IResponse = await response.json();
  return data;
};

export { fetchDataService, fetchDetailedService };
