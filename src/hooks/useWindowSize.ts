import { useState } from 'react';
import { throttle } from 'lodash';

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
  const resizeViewPort = throttle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 300);
  const eventListener = () => {
    window.addEventListener('resize', resizeViewPort);
    return () => {
      window.removeEventListener('resize', resizeViewPort);
    };
  };
  return [windowSize, eventListener];
};

export default useWindowSize;
