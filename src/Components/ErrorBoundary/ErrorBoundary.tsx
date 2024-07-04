import { Component, ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/errorBoundaryTypes';

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error): void {
    console.log('ErrorBoundary', error);

    this.setState({
      hasError: true,
    });
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
