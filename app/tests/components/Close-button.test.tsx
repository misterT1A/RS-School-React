import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseButton from '../../UI/button/Close-button';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
  useSearchParams: jest.fn().mockReturnValue([new URLSearchParams({ query: 'test', page: '1' })]),
}));

jest.mock(
  '../../Components/favorite-button/Favorite-button.tsx',
  () => (): ReactElement => <button type="button">FavoriteButton</button>,
);

describe('CloseButton', () => {
  const navigate = useNavigate();
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
      expect(navigate).toHaveBeenCalled();
    });
  });
});
