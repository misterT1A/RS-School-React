import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import Loader from '../../UI/loader/loader';

describe('Loader', () => {
  it('render the loader', () => {
    render(
      <MemoryRouter>
        <Loader />
      </MemoryRouter>,
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
