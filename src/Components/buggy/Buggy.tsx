import { Component, ReactNode } from 'react';
import IBugComponent from '../../types/buggyTypes';

export default class BuggyComponent extends Component<object, IBugComponent> {
  constructor(props: object) {
    super(props);
    this.state = { error: false };
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error) throw new Error('crash');
    return (
      <button
        type="button"
        onClick={() => {
          this.setState({ error: true });
        }}
      >
        Click me to crash
      </button>
    );
  }
}
