import { Component, ReactNode } from 'react';

import './list.css';
import IListProps from '../../types/listTypes';

export default class List extends Component<IListProps> {
  render(): ReactNode {
    const { products } = this.props;
    return (
      <ul className="list_wrapper">
        {products.map((elem) => (
          <li key={elem.id} className="list_item">
            <p className="title">Planet: {elem.name}</p>
            <p className="decription">Climate: {elem.climate}</p>
            <p className="decription">Population: {elem.terrain}</p>
          </li>
        ))}
      </ul>
    );
  }
}
