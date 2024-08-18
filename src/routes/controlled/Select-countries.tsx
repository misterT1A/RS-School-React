import { useState, type FC, type ReactElement } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useSelector } from 'react-redux';

import type { RootState } from '../../store/store';
import styles from '../../styles/form.module.scss';
import type { IFormValues } from '../../types/formTypes';

interface IProps {
  onChange: (value: string) => void;
  value: string;
  errors: FieldErrors<IFormValues>;
}

const SelectCountries: FC<IProps> = ({ onChange, value, errors }): ReactElement => {
  const countries = useSelector((state: RootState) => state.countries.countries);
  const [isShowDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value: search } = e.target;

    onChange(search);
    setShowDropdown(true);
  };

  return (
    <label htmlFor="country" className={styles.countries}>
      <input
        name="contry"
        onChange={handleInputChange}
        type="text"
        value={value}
        autoComplete="off"
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {isShowDropdown && (
        <ul className={styles.dropdown_list}>
          {countries
            .filter((country) => country.name.toLowerCase().includes(value.toLowerCase()) && country.name !== value)
            .map((country) => (
              <li
                className={styles.dropdown_item}
                key={country.name}
                onClick={() => {
                  onChange(country.name);
                  setShowDropdown(false);
                }}
              >
                {country.name}
              </li>
            ))}
        </ul>
      )}
      {errors.country && <p className={styles.error}>{errors.country.message}</p>}
    </label>
  );
};

export default SelectCountries;
