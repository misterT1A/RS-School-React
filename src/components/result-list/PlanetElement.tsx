'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useContext } from 'react';

import { ThemeContext, ThemeEnum } from '@/context';
import type { IPlanet } from '@/types/rootTypes';
import extractLastNumber from '@/utils/result-list-helpers';

import styles from './_Result-list.module.scss';
import FavoriteButton from '../favorite-button/FavoriteButton';

const PlanetElement = ({ planet, details }: { planet: IPlanet; details: string }) => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div
      className={
        details === extractLastNumber(planet.url ? planet.url : '')
          ? `${styles.list_item} ${styles.active}`
          : styles.list_item
      }
      onClick={(e) => {
        e.stopPropagation();
        // router.replace(
        //   `/?q=${searchParams.q || ''}&page=${searchParams.page || '1'}&details=${extractLastNumber(elem.url ? elem.url : '')}`,
        //   undefined,
        //   { shallow: true },
        // );
        // setIsDetailedVisible(true);
        const newSearchParam = new URLSearchParams({
          query: searchParams.get('query')?.toString() || '',
          page: searchParams.get('page')?.toString() || '1',
          details: extractLastNumber(planet.url ? planet.url : ''),
        });
        router.replace(`?${newSearchParam}`);
      }}
    >
      <p className={theme === ThemeEnum.Light ? styles.title : `${styles.title} ${styles.dark}`}>{planet.name}</p>
      <FavoriteButton planetForCheck={planet} />
    </div>
  );
};

export default PlanetElement;
