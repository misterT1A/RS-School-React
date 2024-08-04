import { useRouter } from 'next/router';
import type { Dispatch, ReactNode } from 'react';

import styles from './_Detailed-block.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import useClassThemeToggler from '../../hooks/useClassThemTogler';
import useGetCurrentPlanet from '../../hooks/useGetCurrentPlanet';
import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
import btnStyles from '../../UI/button/_button.module.scss';
import Loader from '../../UI/loader/loader';
import filterPlanet from '../../utils/filterPlanet';

const DetailedBlock = ({
  handleClickVisible,
}: {
  handleClickVisible: Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wrapperClass = useClassThemeToggler(styles.wrapper, styles.dark);
  const productId = router.query.details?.toString();

  const [planet, isFetching] = useGetCurrentPlanet(productId);

  const isFavoritePlanet = useAppSelector(
    (state) => !!state.favorite.planets.find((elem: { name: string | undefined }) => elem.name === planet?.name),
  );

  if (isFetching) {
    return <Loader />;
  }

  if (!planet) {
    return <h2>error</h2>;
  }

  const filteredData = filterPlanet(planet);

  const addToFavorite = (): void => {
    dispatch(addFavorite(planet));
  };

  const deleteFromFavorite = (): void => {
    dispatch(deleteFavorite(planet));
  };

  return (
    <div id="detailed" className={wrapperClass}>
      <ul className={styles.list}>
        {filteredData?.map(([key, value]) => (
          <li key={key}>
            <p>{`${key}: ------${value}`}</p>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <button
          className={btnStyles.button}
          name="close"
          type="button"
          onClick={() => {
            handleClickVisible(false);

            const { query } = router;
            const { details, ...newQuery } = query;
            console.log(details);
            router.push(
              {
                pathname: router.pathname,
                query: newQuery,
              },
              undefined,
              { shallow: true },
            );
          }}
        >
          Close
        </button>
        <button
          type="button"
          name="favorite"
          className={styles.favoriteBtn}
          onClick={isFavoritePlanet ? deleteFromFavorite : addToFavorite}
        >
          {isFavoritePlanet ? '★' : '☆'}
        </button>
      </div>
    </div>
  );
};

export default DetailedBlock;
