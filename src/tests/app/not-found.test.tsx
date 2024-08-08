import { render, screen } from '@testing-library/react';

import Custom404 from '../../app/not-found';

import '@testing-library/jest-dom';

const setup = () => render(<Custom404 />);

describe('Custom404', () => {
  it('renders the 404 page correctly', () => {
    setup();
    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByTestId('return-button')).toBeInTheDocument();
  });
});
