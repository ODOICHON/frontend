import { useState } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';

type ReturnType = [
  boolean,
  string,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<string>>,
];

const useCheckAPI = (
  mutateFn: UseMutateFunction<any, unknown, string, unknown>,
  regex: RegExp,
  value: string,
  correctMsg?: string,
  errMsg1?: string,
  errMsg2?: string,
): ReturnType => {
  const [checkState, setCheckState] = useState(false);
  const [checkMessage, setCheckMessage] = useState<string>('');
  const handler = () => {
    if (!regex.test(value)) {
      setCheckState(false);
      setCheckMessage(errMsg2 || '잘못되었습니다.');
    }
    mutateFn(value, {
      onSuccess: (res) => {
        if (!res) throw Error;
        if (res.data === true) {
          setCheckState(true);
          setCheckMessage(correctMsg || '사용 가능합니다.');
        } else if (res.data === false) {
          setCheckState(false);
          setCheckMessage(errMsg1 || '잘못되었습니다.');
        }
      },
    });
  };
  return [checkState, checkMessage, handler, setCheckState, setCheckMessage];
};

export default useCheckAPI;
