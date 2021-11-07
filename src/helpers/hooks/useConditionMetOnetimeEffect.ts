import React from 'react';

const useConditionMetOnetimeEffect = (
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined,
  condition?: () => boolean
) => {
  const isEffectRunRef = React.useRef(false);

  const checkEffectPossibleToRun = () => {
    return !isEffectRunRef.current && condition && condition();
  };

  React.useEffect(() => {
    if (checkEffectPossibleToRun()) {
      isEffectRunRef.current = true;
      effect();
    }
    //eslint-disable-next-line
  }, [deps, condition]);
};

export default useConditionMetOnetimeEffect;
