import type { ReactNode } from 'react';
import { Component } from 'react';

import type IBugComponent from '../../types/buggyTypes';

export default class BuggyComponent extends Component<object, IBugComponent> {
  constructor(props: object) {
    super(props);
    this.state = { hasError: false };
  }

  render(): ReactNode {
    const { hasError } = this.state;
    if (hasError) throw new Error('crash');
    return (
      <button
        type="button"
        onClick={() => {
          this.setState({ hasError: true });
        }}
      >
        Click me to crash
      </button>
    );
  }
}
