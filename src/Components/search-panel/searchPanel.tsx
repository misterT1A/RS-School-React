import { Component, ReactNode } from 'react';
import IInputProps from '../../types/searchPanelTypes';

export default class SeacrhPanel extends Component<IInputProps> {
  render(): ReactNode {
    const { value, callback } = this.props;
    return <input value={value} onChange={callback} />;
  }
}
