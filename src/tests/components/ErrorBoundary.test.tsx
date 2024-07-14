import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import '@testing-library/jest-dom';
import ErrorPage from '../../Components/ErrorBoundary/ErrorPage';

describe('ErrorPage', () => {
  test('renders the error message', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  test('has a button to return to the main page', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /return to main page/i })).toBeInTheDocument();
  });

  test('navigates to main page on button click', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<div>Main Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByTestId('return-button');
    fireEvent.click(button);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
