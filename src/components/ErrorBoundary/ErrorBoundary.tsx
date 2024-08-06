import React, { Component } from 'react';

import type { IErrorBoundaryProps, IErrorBoundaryState } from '@/types/errorBoundaryTypes';

import styles from './_Error-page.module.scss';

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
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

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <section className={styles.wrapper}>
          <h1 className={styles.title}>Something went wrong</h1>
        </section>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
