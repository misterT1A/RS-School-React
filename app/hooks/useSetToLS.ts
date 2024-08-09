// import { useEffect, useState } from 'react';

// function useSetToLS(key: string): readonly [string, React.Dispatch<React.SetStateAction<string>>] {
//   const [value, setValue] = useState<string>(() => localStorage[key] || '');

//   useEffect(() => {
//     localStorage[key] = value;
//   }, [value, key]);

//   return [value, setValue] as const;
// }

// export default useSetToLS;

import { useEffect, useState } from 'react';

function useSetToLS(key: string): readonly [string, React.Dispatch<React.SetStateAction<string>>] {
  // Инициализируем значение из localStorage (если доступен window)
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item || '';
    }
    return '';
  });

  useEffect(() => {
    // Обновляем значение в localStorage (если доступен window)
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue] as const;
}

export default useSetToLS;
