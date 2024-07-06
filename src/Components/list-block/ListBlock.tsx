import type { ReactNode } from 'react';
import { Component } from 'react';

import './list.css';
import type IListProps from '../../types/listTypes';

export default class List extends Component<IListProps> {
  render(): ReactNode {
    const { products } = this.props;
    return (
      <ul className="list_wrapper">
        {products.length ? (
          products.map((elem) => (
            <li key={elem.id} className="list_item">
              <p className="title">Planet: {elem.name}</p>
              <p className="decription">Climate: {elem.climate}</p>
              <p className="decription">Terrain: {elem.terrain}</p>
            </li>
          ))
        ) : (
          <h2>No results</h2>
        )}
      </ul>
    );
  }
}
