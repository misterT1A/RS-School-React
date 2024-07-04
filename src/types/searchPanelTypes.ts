import { ChangeEvent } from 'react';

export default interface IInputProps {
  value: string;
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
}
