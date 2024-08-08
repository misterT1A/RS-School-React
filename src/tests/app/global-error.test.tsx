import { render, screen, fireEvent } from '@testing-library/react';

import GlobalError from '../../app/global-error';

describe('GlobalError Component', () => {
  it('should render error message', () => {
    const mockError = new Error('Test error message');
    const mockReset = jest.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText(/Something went wrong! Test error message/i)).toBeInTheDocument();
  });

  it('should call reset function when button is clicked', () => {
    const mockError = new Error('Test error message');
    const mockReset = jest.fn();

    render(<GlobalError error={mockError} reset={mockReset} />);

    const button = screen.getByText('Try again');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockReset).toHaveBeenCalled();
  });
});
