import { render, screen } from '@testing-library/react';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData, useOutletContext, MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import DetailedBlock from '../../Components/detailed-block/Detailed-block';
import detailedLoader from '../../Components/detailed-block/Detailed-block-helpers';
import { fetchDetailedService } from '../../services/fetchDataService';
import type { IProduct, IResponse } from '../../types/rootTypes';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
  useOutletContext: jest.fn(),
}));

const mockProduct = {
  id: 'test',
  climate: 'test',
  created: 'test',
  diameter: 'test',
  edited: 'test',
  films: ['test', 'test'],
  gravity: 'test',
  name: 'test',
  orbital_period: 'test',
  population: 'test',
  residents: ['test', 'test'],
  rotation_period: 'test',
  surface_water: 'test',
  terrain: 'test',
  url: '',
};

describe('DetailedBlock', () => {
  const mockHandleClickVisible = jest.fn();

  beforeEach(() => {
    (useOutletContext as jest.Mock).mockReturnValue({ handleClickVisible: mockHandleClickVisible });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message if product is not available', () => {
    (useLoaderData as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter>
        <DetailedBlock />
      </MemoryRouter>,
    );

    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders product details correctly', () => {
    (useLoaderData as jest.Mock).mockReturnValue(mockProduct);

    render(
      <MemoryRouter>
        <DetailedBlock />
      </MemoryRouter>,
    );

    const productKeys = Object.keys(mockProduct).filter((key) => !['residents', 'films', 'url'].includes(key));
    productKeys.forEach((key) => {
      const valueElement = screen.getByText(new RegExp(`${key}: ------${mockProduct[key as keyof IProduct]}`, 'i'));
      expect(valueElement).toBeInTheDocument();
    });
  });
});

jest.mock('../../services/fetchDataService');

describe('detailed block helpers', () => {
  const mockFetchDetailedService = fetchDetailedService as jest.MockedFunction<typeof fetchDetailedService>;

  const response = {
    count: 1,
    next: 'test',
    previous: null,
    results: [mockProduct],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns data when fetchDetailedService succeeds', async () => {
    const mockData: IResponse = response;
    mockFetchDetailedService.mockResolvedValue(mockData);

    const args = { params: { productId: '123' }, request: {} };
    const result = await detailedLoader(args as unknown as LoaderFunctionArgs);

    expect(mockFetchDetailedService).toHaveBeenCalledWith('123');
    expect(result).toEqual(mockData);
  });

  it('returns undefined when productId is missing', async () => {
    const args = { params: { productId: undefined }, request: {} };
    const result = await detailedLoader(args as unknown as LoaderFunctionArgs);

    expect(mockFetchDetailedService).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('logs an error message when fetchDetailedService throws an error', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const error = new Error('Fetch error');
    mockFetchDetailedService.mockRejectedValue(error);

    const args = { params: { productId: '123' }, request: {} };
    await detailedLoader(args as unknown as LoaderFunctionArgs);

    expect(consoleSpy).toHaveBeenCalledWith('Error fetch detailed', error);

    consoleSpy.mockRestore();
  });
});
