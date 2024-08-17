import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import type { ICountry } from '../../store/countriesSlice';
import type { RootState } from '../../store/store';
import styles from '../../styles/form.module.scss';

interface IProps {
  name: string;
  error: Record<string, string>;
}

const SelectCountries: React.FC<IProps> = ({ name, error }) => {
  const countries = useSelector((state: RootState) => state.countries.countries);

  const [isShowDropdown, setShowDropdown] = useState<boolean>(false);
  const [filterCountries, setCountries] = useState<ICountry[]>(countries);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilter = (): void => {
    const filterCountrys = (country: { name: string }): boolean => {
      if (!inputRef.current) return false;
      const searchValue = (inputRef.current as HTMLInputElement).value.toLowerCase();
      return country.name.toLowerCase().includes(searchValue);
    };

    const newFilterCountries = countries.filter(filterCountrys);
    setCountries(() => newFilterCountries);
    setShowDropdown(true);
  };

  const handleItemClick = (countryName: string): void => {
    if (inputRef.current) {
      inputRef.current.value = countryName;
    }
    setShowDropdown(false);
  };

  return (
    <label htmlFor={name} className={styles.countries}>
      <input
        id={name}
        name={name}
        type="text"
        ref={inputRef}
        autoComplete="off"
        onChange={handleFilter}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {isShowDropdown && (
        <ul className={styles.dropdown_list}>
          {filterCountries.map((country) => (
            <li className={styles.dropdown_item} key={country.name} onClick={() => handleItemClick(country.name)}>
              {country.name}
            </li>
          ))}
        </ul>
      )}
      {error.country && <p className={styles.error}>{error.country}</p>}
    </label>
  );
};

export default SelectCountries;
