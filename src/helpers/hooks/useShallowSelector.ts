import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '@/store';

type TStateSelector<T> = (state: RootState) => T;

const useShallowSelector = <T>(selector: TStateSelector<T>): T =>
  useSelector(selector, shallowEqual);

export default useShallowSelector;
