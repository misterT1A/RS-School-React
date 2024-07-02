import { ChangeEvent, Component, MutableRefObject, ReactNode, createRef } from 'react';

import { IState } from './types/appTypes';
import LSService from './services/localStorageService';
import fetchData from './services/fetchData';
import SeacrhPanel from './Components/search-panel/searchPanel';
import List from './Components/list-panel/list';
import Loader from './utils/loader/loader';

export default class App extends Component<object, IState> {
  protected AbortController: MutableRefObject<AbortController | null>;

  constructor(props: object) {
    super(props);
    this.state = {
      isLoad: true,
      searchValue: LSService.getDataLS() || '',
      data: null,
    };

    this.AbortController = createRef<AbortController>();
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
    console.log(isLoad, data, searchValue, this.handleSearchChange);
    return (
      <>
        <button type="button" onClick={this.handleStartSearch}>
          Search
        </button>
        <SeacrhPanel value={searchValue} callback={this.handleSearchChange} />
        <button type="button" onClick={this.handleStartSearch}>
          Search
        </button>
        {!isLoad && data ? <List products={data} /> : <Loader />}
      </>
    );
  }
}
