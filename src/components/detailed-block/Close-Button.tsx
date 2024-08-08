'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import btnStyles from '@/UI/button/_button.module.scss';

const CloseButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <button
      className={btnStyles.button}
      name="close"
      type="button"
      onClick={() => {
        const newUrl = new URLSearchParams({
          query: searchParams.get('query')?.toString() || '',
          page: searchParams.get('page')?.toString() || '1',
        });
        router.push(`?${newUrl}`);
      }}
    >
      Close
    </button>
  );
};

export default CloseButton;
