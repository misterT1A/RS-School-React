import { render, screen } from '@testing-library/react';

import Home from '../../app/page';

jest.mock('../../components/root/Root.tsx', () => ({
  __esModule: true,
  default: () => <div>Root</div>,
}));
describe('Home Component', () => {
  it('should render RootWithLoader component with provided searchParams', () => {
    const searchParams = { query: 'test', page: '1' };

    render(<Home searchParams={searchParams} />);

    expect(screen.getByText('Root')).toBeInTheDocument();
  });
});
