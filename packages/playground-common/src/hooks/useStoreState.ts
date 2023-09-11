import { Dispatch, SetStateAction, useState } from "react";

export function useStoreState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  const setStoreValue: Dispatch<SetStateAction<T>> = (newValue) => {
    setValue((prevValue) => {
      const result =
        newValue instanceof Function ? newValue(prevValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setStoreValue] as const;
}
