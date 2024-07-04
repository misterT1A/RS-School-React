import { ChangeEvent, Component, MutableRefObject, ReactNode, createRef } from 'react';

import { IState } from './types/appTypes';
import LSService from './services/localStorageService';
import fetchData from './services/fetchData';
import Loader from './utils/loader/loader';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import BuggyComponent from './Components/buggy/Buggy';
import debounce from './utils/debounce';

import './styles/App.css';
import SearchPanel from './Components/search-block/SearchBlock';
import List from './Components/list-block/ListBlock';

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
