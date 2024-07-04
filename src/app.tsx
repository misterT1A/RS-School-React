import type { ChangeEvent, MutableRefObject, ReactNode } from 'react';
import { Component, createRef } from 'react';

import BuggyComponent from './Components/buggy/Buggy';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import List from './Components/list-block/ListBlock';
import SearchPanel from './Components/search-block/SearchBlock';
import fetchData from './services/fetchData';
import LSService from './services/localStorageService';
import type { IState } from './types/appTypes';
import debounce from './utils/debounce';
import Loader from './utils/loader/loader';

import './styles/App.css';

export default class App extends Component<object, IState> {
  protected AbortController: MutableRefObject<AbortController | null>;

  protected handleSearchDeb: () => void;

  constructor(props: object) {
    super(props);
    this.state = {
      isLoad: true,
      searchValue: LSService.value,
      data: null,
    };

    this.AbortController = createRef<AbortController>();
    this.handleSearchDeb = debounce(this.handleStartSearch.bind(this), 300);
  }

  componentDidMount(): void {
    this.fetchData();
  }

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target) return;
    LSService.value = e.target.value;
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleStartSearch = (): void => {
    this.setState({
      isLoad: true,
    });
    this.fetchData();
  };

  async fetchData(): Promise<void> {
    const { searchValue } = this.state;

    if (this.AbortController.current) {
      this.AbortController.current.abort();
    }

    this.AbortController.current = new AbortController();

    const { signal } = this.AbortController.current;
    try {
      const data = await fetchData(searchValue, signal);
      this.setState({ data, isLoad: false });
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.log('Error fetching data:', error);
      }
    }
  }

  render(): ReactNode {
    const { isLoad, searchValue, data } = this.state;

    return (
      <ErrorBoundary>
        <header>
          <h1>Planet search</h1>
        </header>
        <main>
          <SearchPanel
            value={searchValue}
            onSearchInputChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchDeb}
          />
          <BuggyComponent />
          {!isLoad && data ? <List products={data} /> : <Loader />}
        </main>
      </ErrorBoundary>
    );
  }
}
