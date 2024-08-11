import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

const SafeComponent = () => <div>Safe Component</div>;

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Safe Component')).toBeInTheDocument();
  });
});
