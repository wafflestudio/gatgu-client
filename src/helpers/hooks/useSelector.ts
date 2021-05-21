import { useSelector, shallowEqual } from 'react-redux';

import { RootState } from '@/store/rootState';

type TStateSelector<T> = (state: RootState) => T;
type TShallowEq = typeof shallowEqual;

const useShallowSelector = <T>(
  selector: TStateSelector<T>,
  shallowEqual?: TShallowEq
): T => useSelector(selector, shallowEqual);

export default useShallowSelector;
