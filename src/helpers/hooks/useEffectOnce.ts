import { EffectCallback, useEffect } from 'react';

const useEffectOnce = (fn: EffectCallback): void => {
  useEffect(fn, []);
};

export default useEffectOnce;
