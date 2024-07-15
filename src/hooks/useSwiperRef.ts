import { useState, useRef, useEffect } from 'react';

const useSwiperRef = <T extends HTMLElement>() => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    setWrapper(ref.current);
  }, []);

  return [wrapper, ref] as const;
};

export default useSwiperRef;
