import { ChangeEvent, Component, MutableRefObject, ReactNode, createRef } from 'react';

import { IState } from './types/appTypes';
import LSService from './services/localStorageService';
import fetchData from './services/fetchData';
import SeacrhPanel from './Components/search-panel/searchPanel';
import List from './Components/list-panel/list';
import Loader from './utils/loader/loader';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import BuggyComponent from './Components/buggy/Buggy';
import debounce from './utils/debounce';

import './styles/App.css';

export default class App extends Component<object, IState> {
  protected AbortController: MutableRefObject<AbortController | null>;

  protected handleSearchDeb: () => void;

  constructor(props: object) {
    super(props);
    this.state = {
      isLoad: true,
      searchValue: LSService.getDataLS() || '',
      data: null,
    };

    this.AbortController = createRef<AbortController>();
    this.handleSearchDeb = debounce(this.handleStartSearch.bind(this), 300);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;
    LSService.setDataToLS(e.target.value);
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleStartSearch = () => {
    this.setState({
      isLoad: true,
    });
    this.fetchData();
  };

  async fetchData() {
    const { searchValue } = this.state;

    if (this.AbortController.current) {
      this.AbortController.current.abort();
    }

    this.AbortController.current = new AbortController();

    const { signal } = this.AbortController.current;

    const data = await fetchData(searchValue, signal);

    this.setState({ data, isLoad: false });
  }

  render(): ReactNode {
    const { isLoad, searchValue, data } = this.state;

    return (
      <ErrorBoundary>
        <header>
          <h1>Planet search</h1>
        </header>
        <main>
          <SeacrhPanel value={searchValue} callback={this.handleSearchChange} />
          <button type="button" onClick={this.handleSearchDeb}>
            Search
          </button>
          <BuggyComponent />
          {!isLoad && data ? <List products={data} /> : <Loader />}
        </main>
      </ErrorBoundary>
    );
  }
}
