import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { createMemoryRouter, MemoryRouter, RouterProvider, useNavigation } from 'react-router-dom';

import '@testing-library/jest-dom';
import Root from '../../routes/root/root';

const TestProduct = {
  id: 'test',
  climate: 'test',
  created: 'test',
  diameter: 'test',
  edited: 'test',
  films: ['test', 'test'],
  gravity: 'test',
  name: 'Test Planet',
  orbital_period: 'test',
  population: 'test',
  residents: ['test', 'test'],
  rotation_period: 'test',
  surface_water: 'test',
  terrain: 'test',
  url: '',
};

const response = {
  count: 10,
  next: '//1',
  previous: null,
  results: [TestProduct],
};

jest.mock('../../utils/loader/loader', () => (): ReactNode => <div data-testid="loader">Loader</div>);

jest.mock('../../services/fetchDataService.ts', () => ({
  fetchDataService: jest.fn().mockImplementation(() => Promise.resolve(response)),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigation: jest.fn(),
}));

describe('Root component', () => {
  beforeEach(() => {
    // Устанавливаем значение по умолчанию для useNavigation мока
    (useNavigation as jest.Mock).mockReturnValue({ state: 'idle' });
  });

  test('renders Root component and fetches data', async () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <Root />,
      },
    ]);

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    expect(screen.getByTestId('rootComponent')).toBeInTheDocument();
    expect(screen.getByText('Planet search')).toBeInTheDocument();
  });

  test('hides detailed view on Enter or Space keydown', async () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <Root />,
      },
    ]);

    await act(async () => {
      render(<RouterProvider router={router} />);
    });

    const rootComponent = screen.getByTestId('rootComponent');
    rootComponent.focus();
    fireEvent.keyDown(rootComponent, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByText('Test Planet')).toBeVisible();
    });

    fireEvent.keyDown(rootComponent, { key: ' ' });

    await waitFor(() => {
      expect(screen.queryByText('Test Planet')).toBeVisible();
    });
  });

  test('shows Loader for detailed when navigation state is loading', async () => {
    (useNavigation as jest.Mock).mockReturnValue({ state: 'loading' });

    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>,
    );

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });
});
