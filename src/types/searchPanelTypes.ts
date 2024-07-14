import type { SetURLSearchParams } from 'react-router-dom';

export default interface IInputProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  setValueLS: React.Dispatch<React.SetStateAction<string>>;
}
