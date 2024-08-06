import { fireEvent, render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import Custom404 from '@/pages/404';
import '@testing-library/jest-dom';
import createMockRouter from 'mock/createMockRouter';

const setup = () =>
  render(
    <RouterContext.Provider value={createMockRouter({})}>
      <Custom404 />
    </RouterContext.Provider>,
  );

describe('Custom404', () => {
  it('renders the 404 page correctly', () => {
    setup();
    expect(screen.getByText('404 Page not found')).toBeInTheDocument();
    expect(screen.getByTestId('return-button')).toBeInTheDocument();
  });

  it('calls router.push when the return button is clicked', () => {
    const push = jest.fn();
    const mockRouter = createMockRouter({ push });

    render(
      <RouterContext.Provider value={mockRouter}>
        <Custom404 />
      </RouterContext.Provider>,
    );

    const returnButton = screen.getByTestId('return-button');
    fireEvent.click(returnButton);

    expect(push).toHaveBeenCalledWith('/');
  });
});
