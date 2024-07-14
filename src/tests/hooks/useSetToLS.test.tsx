import { renderHook } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';

import useSetToLS from '../../hooks/useSetToLS';

describe('useSetToLS', () => {
  it('should set and get value from localStorage', () => {
    const { result } = renderHook(() => useSetToLS('test'));
    expect(result.current[0]).toBe('');

    act(() => {
      result.current[1]('Value');
    });

    expect(result.current[0]).toBe('Value');
    expect(localStorage.getItem('test')).toBe('Value');
  });
});
