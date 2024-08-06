import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Loader from '../../UI/loader/loader';

describe('Loader', () => {
  it('render the loader', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
