import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import '@testing-library/jest-dom';
import CloseButton from '@/components/detailed-block/Close-Button';
import DetailedBlock from '@/components/detailed-block/Detailed-block';

import { mockPlanet } from '../../../mock/handlers';
import type { IPlanet } from '../../types/rootTypes';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
    push: jest.fn(),
  })),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams({ query: 'ta', page: '1', details: '1' })),
}));

jest.mock('../../components/favorite-button/FavoriteButton.tsx', () => () => (
  <button type="button">FavoriteButton</button>
));

describe('DetailedBlock Component', () => {
  const setup = async () =>
    render(
      await (async () => {
        const jsx = await DetailedBlock({ detailed: '1' });
        return jsx;
      })(),
    );

  it('should display details', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByText('name: ------Tatooine')).toBeInTheDocument();
    });
  });

  it('renders product details correctly', async () => {
    setup();
    const productKeys = Object.keys(mockPlanet).filter((key) => !['residents', 'films', 'url'].includes(key));
    await waitFor(() =>
      productKeys.forEach((key) => {
        const valueElement = screen.getByText(new RegExp(`${key}: ------${mockPlanet[key as keyof IPlanet]}`, 'i'));
        expect(valueElement).toBeInTheDocument();
      }),
    );
  });
});

describe('CloseButton', () => {
  const router = useRouter();
  it('renders the button correctly', () => {
    render(<CloseButton />);
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Close');
  });

  it('calls router.push with correct query parameters when clicked', () => {
    render(<CloseButton />);

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    waitFor(() => {
      expect(router.push).toHaveBeenCalled();
    });
  });
});
