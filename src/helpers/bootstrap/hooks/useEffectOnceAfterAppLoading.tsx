import { useEffect, useRef } from 'react';

const useEffectOnceAfterAppLoaded = (cb: () => void, appLoading: boolean) => {
  const mounted = useRef(false);
  const executed = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (executed.current) return;

    if (!appLoading) {
      cb();
      executed.current = true;
    }
    // eslint-disable-next-line
  }, [appLoading]);
};

export default useEffectOnceAfterAppLoaded;
