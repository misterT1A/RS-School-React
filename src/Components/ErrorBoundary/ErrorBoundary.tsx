import { Component } from 'react';
import type { ReactNode } from 'react';

import type { IErrorBoundaryProps, IErrorBoundaryState } from '../../types/errorBoundaryTypes';

export default class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
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
