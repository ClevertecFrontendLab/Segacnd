import { useMemo } from 'react';
import debounce from 'lodash.debounce';

import { useLatest } from './use-latest-hook';

interface IDebounceHook {
  cb: (e: any) => void;
  ms: number;
}

export const useDebounce = ({ cb, ms }: IDebounceHook) => {
  const latestCb = useLatest(cb);

  return useMemo(
    () =>
      debounce((...args) => {
        latestCb.current(...args);
      }, ms),
    [latestCb, ms]
  );
};
