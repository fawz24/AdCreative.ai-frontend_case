import { useEffect, useState } from "react";

export const useLocalStorage = <D>(key: string, defaultValue: D) => {
  const [state, setState] = useState<D>(() => {
    let value: D;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify([])
      );
    } catch {
      value = defaultValue;
    }
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as [D, typeof setState];
};
