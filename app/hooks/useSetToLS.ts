import { useEffect, useState } from 'react';

// const useSetToLS = (key: string): readonly [(value: string) => void, () => string | null] => {
//   const setValue = (value: string): void => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem(key, value);
//     }
//   };

//   const getValue = (): string | null => {
//     if (typeof window !== 'undefined') {
//       localStorage.getItem(key);
//     }
//     return null;
//   };

//   return [setValue, getValue] as const;
// };

// export default useSetToLS;

function useSetToLS(key: string): readonly [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue] as const;
}

export default useSetToLS;
