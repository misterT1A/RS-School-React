export interface IState {
  isLoad: boolean;
  searchValue: string;
  data: IProduct[] | null;
  page: number;
  maxPage: number;
}

export interface IResponse {
  count: number;
  newxt: string;
  previous: null | string;
  results: IProduct[];
}

export interface IProduct {
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
