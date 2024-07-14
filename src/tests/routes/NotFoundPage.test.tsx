import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import NotFoundPage from '../../routes/not-found-page/NotFoundPage';

describe('NotFoundPage', () => {
  test('renders 404 message', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
  });

  test('has a button to return to the main page', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /return to main page/i })).toBeInTheDocument();
  });

  test('navigates to main page on button click', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<div>Main Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const button = screen.getByTestId('return-button');
    fireEvent.click(button);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
