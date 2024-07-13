import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import ErrorPage from '../../Components/ErrorBoundary/ErrorPage';

describe('ErrorPage', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
  });

  it('renders the error message', () => {
    const titleElement = screen.getByText(/something went wrong/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the return button', () => {
    const buttonElement = screen.getByRole('button', { name: /return to main page/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
