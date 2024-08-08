import { render, screen } from '@testing-library/react';

import RootLayout from '@/app/layout';

jest.mock('../../components/header/Header.tsx', () => () => <div>Header</div>);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    replace: jest.fn(),
    push: jest.fn(),
  })),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams({ query: 'ta', page: '1', details: '1' })),
}));

describe('RootLayout', () => {
  it('should render children correctly', () => {
    render(
      <RootLayout withoutHtmlBody>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should render Header component', () => {
    render(
      <RootLayout withoutHtmlBody>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
