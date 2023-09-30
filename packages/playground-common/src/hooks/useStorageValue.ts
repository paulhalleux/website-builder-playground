import { useState } from "react";

import { useEventListener } from "./useEventListener";

export function useStorageValue<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEventListener("storage", (event) => {
    if (event.key === key && event.newValue) {
      setValue(JSON.parse(event.newValue));
    }
  });

  return value;
}
