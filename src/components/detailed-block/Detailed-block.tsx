import type { ReactElement } from 'react';

import type { IPlanet } from '@/types/rootTypes';

import styles from './_Detailed-block.module.scss';
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
