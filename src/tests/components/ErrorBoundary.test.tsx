// __tests__/ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test Error');
};

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

  it('renders fallback UI when an error is thrown by a child component', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
