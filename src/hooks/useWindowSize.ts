import { useState } from 'react';
import { debounce } from 'lodash';

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
  }, 500);
  const eventListener = () => {
    window.addEventListener('resize', resizeViewPort);
    return () => {
      window.removeEventListener('resize', resizeViewPort);
    };
  };
  return [windowSize, eventListener];
};

export default useWindowSize;
