export interface IForm {
  id: string;
  form: string;
  name: string;
  age: string;
  pass: string;
  confirmPass: string;
  gender: string;
  agreement: boolean;
  image: string;
  country: string;
}

export interface IInitialState {
  forms: IForm[];
}
