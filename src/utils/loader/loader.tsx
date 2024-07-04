import type { ReactNode } from 'react';
import { Component } from 'react';
import './loader.css';

export default class Loader extends Component {
  render(): ReactNode {
    return <div className="loader" />;
  }
}
