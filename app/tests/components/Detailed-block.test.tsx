import { useLoaderData, useNavigation } from '@remix-run/react';
import { render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';

import DetailedBlock from '../../routes/details.$detailsId';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('@remix-run/react', () => ({
  useLoaderData: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('../../utils/filterPlanet.ts', () => jest.fn().mockReturnValue([['Name', 'Tatooine']]));

jest.mock(
  '../../Components/favorite-button/Favorite-button.tsx',
  () => (): ReactElement => <button type="button">FavoriteButton</button>,
);

jest.mock('../..//UI/button/Close-button.tsx', () => (): ReactElement => <button type="button">closeButton</button>);

describe('DetailedBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loader when loading', () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: 'loading' });
    (useLoaderData as jest.Mock).mockReturnValue({ planet: ['test'] });

    render(<DetailedBlock />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays "No data" if planet data is not available', () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });
    (useLoaderData as jest.Mock).mockReturnValue({ planet: null });

    render(<DetailedBlock />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('displays the planet details after loading', async () => {
    const mockPlanet = { name: 'Tatooine', climate: 'arid', population: '200000' } as IPlanet;
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });
    (useLoaderData as jest.Mock).mockReturnValue({ planet: mockPlanet });

    render(<DetailedBlock />);

    await waitFor(() => {
      expect(screen.getByText('Name: ------Tatooine')).toBeInTheDocument();
    });
  });
});
