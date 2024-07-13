import { useEffect, useState } from 'react';

function useSetToLS(key: string): readonly [string, React.Dispatch<React.SetStateAction<string>>] {
  const [value, setValue] = useState<string>(() => localStorage[key] || '');

  useEffect(() => {
    localStorage[key] = value;
    return () => {
      localStorage[key] = value;
    };
  }, [value, key]);

  return [value, setValue] as const;
}

export default useSetToLS;
