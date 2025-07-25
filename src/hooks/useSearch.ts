import { useState } from 'react';

type UseStorageReturn = [string, (v: string) => void];

export function useSearch(key: string, defaultValue: string): UseStorageReturn {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? storedValue : defaultValue;
  });

  const updateValue = (newValue: string) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [value, updateValue];
}
