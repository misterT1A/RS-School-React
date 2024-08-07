// import { useRouter } from 'next/router';
import type { ReactElement } from 'react';

import type { IPlanet } from '@/types/rootTypes';

import styles from './_Detailed-block.module.scss';
// import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
// import useClassThemeToggler from '../../hooks/useClassThemTogler';
// import useGetCurrentPlanet from '../../hooks/useGetCurrentPlanet';
// import { addFavorite, deleteFavorite } from '../../store/favoriteSlice';
// import btnStyles from '../../UI/button/_button.module.scss';
// import Loader from '../../UI/loader/loader';
import CloseButton from './Close-Button';
import filterPlanet from '../../utils/filterPlanet';
import FavoriteButton from '../favorite-button/FavoriteButton';

const getCurrentPlanet = async (planetId: string): Promise<IPlanet> => {
  const res = await fetch(`https://swapi.dev/api/planets/${planetId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const DetailedBlock = async ({ detailed }: { detailed: string }): Promise<ReactElement> => {
  const planet = await getCurrentPlanet(detailed);
  //   const dispatch = useAppDispatch();
  //   const router = useRouter();
  //   const wrapperClass = useClassThemeToggler(styles.wrapper, styles.dark);

  // const [planet, isFetching] = useGetCurrentPlane(productId);

  //   const isFavoritePlanet = useAppSelector(
  //     (state) => !!state.favorite.planets.find((elem: { name: string | undefined }) => elem.name === planet?.name),
  //   );

  const filteredData = filterPlanet(planet);

  return (
    <div id="detailed" className={styles.wrapper}>
      <ul className={styles.list}>
        {filteredData?.map(([key, value]) => (
          <li key={key}>
            <p>{`${key}: ------${value}`}</p>
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <CloseButton />
        <FavoriteButton planetForCheck={planet} />
      </div>
    </div>
  );
};

export default DetailedBlock;
