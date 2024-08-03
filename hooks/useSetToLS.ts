import { useEffect, useState } from 'react';

function useSetToLS(key: string): readonly [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : '';
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue] as const;
}

export default useSetToLS;
