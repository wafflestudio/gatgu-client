import { useDispatch } from 'react-redux';

import { asyncStoragekey } from '@/constants/asyncStorage';
import { ArrayStorage } from '@/helpers/functions/asyncStorage';
import { setKeyword, addRecentSearch } from '@/store/searchSlice';

type TUseKeywordDispath = () => (keyword: string) => void;

const useKeywordDispatch: TUseKeywordDispath = () => {
  const dispatch = useDispatch();
  return (keyword: string) => {
    dispatch(addRecentSearch({ keyword }));
    dispatch(setKeyword({ keyword }));
    ArrayStorage.addElem(asyncStoragekey.RECENT_SEARCH, keyword);
  };
};

export default useKeywordDispatch;
