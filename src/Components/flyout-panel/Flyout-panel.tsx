import { type ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Flyout-panel.module.scss';
import { useAppSelector } from '../../hooks/storeHooks';
import { deleteAllFavorites } from '../../store/favoriteSlice';
import btnStyles from '../../UI/button/_button.module.scss';

const FlyoutPanel = (): ReactNode => {
  const favoritePlanets = useAppSelector((state) => state.favorite.planets);
  const dispatch = useDispatch();

  const unselectedHandler = (): void => {
    dispatch(deleteAllFavorites());
  };

  const downloadCSV = (): string => {
    if (favoritePlanets.length) {
      const headers = Object.keys(favoritePlanets[0]);
      const data = favoritePlanets.map((planet) => Object.values(planet));
      const csvContent = [headers.join(';'), ...data.map((row) => row.join(';'))].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      return url;
    }
    return '';
  };

  return (
    <section id="flyout" className={`${styles.wrapper} ${favoritePlanets.length && styles.active}`}>
      <button className={btnStyles.button} name="close" type="button" onClick={unselectedHandler}>
        Unselect all
      </button>
      <div className={styles.tittle}>{`${favoritePlanets.length} items are selected`}</div>
      <button
        disabled={!favoritePlanets.length}
        className={btnStyles.button}
        name="close"
        type="button"
        onClick={downloadCSV}
      >
        <a href={downloadCSV()} download={`${favoritePlanets.length}_planets.csv`}>
          Download
        </a>
      </button>
    </section>
  );
};

export default FlyoutPanel;
