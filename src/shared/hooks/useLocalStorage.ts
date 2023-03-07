import {useState} from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(() => {
    if (!window) {
      return initialValue;
    }
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  })

  const setValue = (value: T) => {
    setStoredValue(value);
    if (window) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  const removeValue = (key: string) => {
    window.localStorage.removeItem(key);
  }

  return [storedValue, setValue, removeValue]
}

