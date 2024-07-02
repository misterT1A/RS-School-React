import { Component } from 'react';
import IBagComponent from '../../types/baggyTypes';

export default class BuggyComponent extends Component<object, IBagComponent> {
  constructor(props: object) {
    super(props);
    this.state = { error: false };
  }

  render() {
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
