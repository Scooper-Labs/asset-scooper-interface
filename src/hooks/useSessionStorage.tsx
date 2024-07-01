import { useState, useEffect, useMemo } from "react";

// 300 seconds expiry
const EXPIRY = 300 * 1000;

interface ValuePair {
  value: object | null;
  expiry: number;
}

function useSessionStorage(key: string, valuePair: any) {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = window.sessionStorage.getItem(key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue) as ValuePair;
        if (Date.now() < parsedValue.expiry) {
          return parsedValue.value;
        }
        window.sessionStorage.removeItem(key); // Remove expired item
      }
    }
    return valuePair;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const expiryTime = Date.now() + EXPIRY;
      window.sessionStorage.setItem(
        key,
        JSON.stringify({ value, expiry: expiryTime })
      );
    }
  }, [key, value]);

  return { value, setValue };
}

export default useSessionStorage;
