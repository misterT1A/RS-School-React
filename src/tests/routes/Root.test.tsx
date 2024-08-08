import { render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import Root from '@/components/root/Root';

jest.mock('../../components/flyout-panel/Flyout-panel.tsx', () => () => <div>FlyoutPanel</div>);
jest.mock('../../components/result-list/Pagination.tsx', () => () => <div>Pagination</div>);
jest.mock('../../components/result-list/Result-list.tsx', () => () => <div>result</div>);

describe('Root Component', () => {
  const setup = async () =>
    render(
      await (async () => {
        const jsx = await Root({ searchParams: { query: 'test', page: '1', detailed: '1' } });
        return jsx;
      })(),
    );

  it('should display list of planets after data is fetched', async () => {
    setup();
    await waitFor(() => {
      expect(screen.getByTestId('rootComponent')).toBeInTheDocument();
    });
  });
});
