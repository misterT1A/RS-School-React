import { render, screen, waitFor } from '@testing-library/react';
import { useState, type ReactNode } from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { useGetPlanets } from '../../hooks';
import store from '../../store/store';

const TestComponent = (): ReactNode => {
  const [pageState, setPageState] = useState({ currentPage: 1, maxPage: 1 });
  const [data, isLoading, isFetching] = useGetPlanets(setPageState);

  if (isLoading) return <div>Loading...</div>;
  if (isFetching) return <div>Fetching...</div>;

  return (
    <div>
      <div>Current Page: {pageState.currentPage}</div>
      <div>Max Page: {pageState.maxPage}</div>
      <div>Results: {data?.results.map((planet) => <div key={planet.name}>{planet.name}</div>)}</div>
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
    await waitFor(() => expect(screen.getByText('test')).toBeInTheDocument());
  });
});
