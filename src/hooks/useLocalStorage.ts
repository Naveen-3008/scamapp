import { useCallback, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) {
        return initialValue;
      }
      const parsed = JSON.parse(raw) as T;
      if (
        typeof initialValue === 'object' &&
        initialValue !== null &&
        !Array.isArray(initialValue) &&
        typeof parsed === 'object' &&
        parsed !== null
      ) {
        return { ...initialValue, ...parsed };
      }
      return parsed;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          } catch {
            // Ignore storage quota errors in restricted private browsing modes
          }
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
