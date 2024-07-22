export interface IState {
  isLoad: boolean;
  searchValue: string;
  data: IPlanet[] | null;
  page: number;
  maxPage: number;
}

export interface IPageState {
  currentPage: number;
  maxPage: number;
}

export interface ISearchParams {
  searchValue: string;
  pageNumber: number;
}

export interface IResponse {
  count: number;
  next: string | null;
  previous: null | string;
  results: IPlanet[];
}

export interface IPlanet {
  id?: string;
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}
