import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { mockPlanet } from '../../mock/handlers';
import { setPlanet } from '../../store/detailedSlice';
import store from '../../store/store';

const TestComponent = (): ReactNode => {
  const dispatch = useAppDispatch();
  const planet = useAppSelector((state) => state.planet);

  return (
    <div>
      <button type="button" onClick={() => dispatch(setPlanet(mockPlanet))}>
        Add Planet
      </button>
      <div>{planet.currentPlanet?.name}</div>
    </div>
  );
};

describe('useAppHooks', () => {
  it('should dispatch an action and update the state', async () => {
    render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Add Planet'));

    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
  });
});
