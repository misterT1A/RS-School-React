import { fetchDataService, fetchDetailedService } from '../../services/fetchDataService';
import type { IProduct } from '../../types/rootTypes';

const mockResponse = {
  results: [{ name: 'Planet 1' } as IProduct],
  count: 2,
  next: 'nextPageUrl',
  previous: null,
};
describe('fetchDataService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches data correctly for searchValue and pageNumber', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    const searchValue = 'test';
    const pageNumber = 1;

    const result = await fetchDataService(searchValue, pageNumber);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    jest.restoreAllMocks();
  });

  it('handles fetch error gracefully', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Fetch error'));

    const searchValue = 'test';
    const pageNumber = 1;
    await expect(fetchDataService(searchValue, pageNumber)).rejects.toThrow('Fetch error');
  });
  it('handles HTTP error properly', async () => {
    const mockStatus = 404;

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: mockStatus,
    });

    const searchValue = 'test';
    const pageNumber = 1;

    await expect(fetchDataService(searchValue, pageNumber)).rejects.toThrowError(`HTTP error! Status: ${mockStatus}`);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe('fetchDetailedService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches detailed data correctly for searchValue', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });
    const searchValue = '1';
    const data = await fetchDetailedService(searchValue);

    expect(global.fetch).toHaveBeenCalledWith(`https://swapi.dev/api/planets/1`);
    expect(data).toEqual(mockResponse);
    jest.restoreAllMocks();
  });

  it('handles fetch error gracefully', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Fetch error'));

    const searchValue = '1';
    await expect(fetchDetailedService(searchValue)).rejects.toThrow('Fetch error');
  });

  it('handles HTTP error properly', async () => {
    const mockStatus = 404;

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: mockStatus,
    });

    const searchValue = 'test'; // Пример значения для поиска

    await expect(fetchDetailedService(searchValue)).rejects.toThrowError(`HTTP error! Status: ${mockStatus}`);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
