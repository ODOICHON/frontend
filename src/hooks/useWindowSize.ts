import { debounce } from 'lodash';
import { useState } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

type ReturnType = [windowSize: WindowSize, eventListener: () => () => void];

const useWindowSize = (): ReturnType => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const resizeViewPort = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 1000);
  const eventListener = () => {
    window.addEventListener('resize', resizeViewPort);
    return () => {
      window.removeEventListener('resize', resizeViewPort);
    };
  };
  return [windowSize, eventListener];
};

export default useWindowSize;
