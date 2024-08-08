'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

import styles from '@/styles/_root.module.scss';

const Wrapper = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickVisibleWithEvent = (event: React.MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (
      !target.closest('#detailed') &&
      !target.closest('#planets') &&
      !target.closest('#input') &&
      !target.closest('#flyout') &&
      !target.closest('#themeTogler')
    ) {
      const newUrl = new URLSearchParams({
        query: searchParams.get('query')?.toString() || '',
        page: searchParams.get('page')?.toString() || '1',
      });
      router.push(`?${newUrl}`);
    }
  };

  return (
    <section data-testid="wrapperComponent" className={styles.wrapper} onClick={handleClickVisibleWithEvent}>
      {children}
    </section>
  );
};

export default Wrapper;
