import { useEffect, useRef } from 'react';

export const usePrevious = (value: unknown) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
    // eslint-disabled-next-line
  }, []);

  return ref.current;
};
