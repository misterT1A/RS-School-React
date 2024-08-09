import { render, screen, waitFor } from '@testing-library/react';
import { type ReactNode } from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { useGetCurrentPlanet } from '../../hooks';
import store from '../../store/store';

const TestComponent = (): ReactNode => {
  const [data, isLoading] = useGetCurrentPlanet('1');

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>{data?.name}</div>
    </div>
  );
};

describe('useGetPlanets', () => {
  it('fetches and displays data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <TestComponent />
        </Provider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('Tatooine')).toBeInTheDocument());
  });
});
