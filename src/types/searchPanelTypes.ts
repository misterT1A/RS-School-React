import { ChangeEvent } from 'react';

export default interface IInputProps {
  value: string;
  callback: (e: ChangeEvent<HTMLInputElement>) => void;
}
