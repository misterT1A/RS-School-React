import { Component, ReactNode } from 'react';
import IInputProps from '../../types/searchPanelTypes';

export default class SearchPanel extends Component<IInputProps> {
  render(): ReactNode {
    const { value, onSearchInputChange, onSearchSubmit } = this.props;

    return (
      <form>
        <input value={value} onChange={onSearchInputChange} />
        <button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            onSearchSubmit();
          }}
        >
          Search
        </button>
      </form>
    );
  }
}
