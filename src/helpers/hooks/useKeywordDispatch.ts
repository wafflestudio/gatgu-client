import { useDispatch } from 'react-redux';
import { setKeyword, addRecentSearch } from '@/store/searchedArticleSlice';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { asyncStorageFunc } from '@/helpers/functions';
type TUseKeywordDispath = () => (keyword: string) => void;

const useKeywordDispatch: TUseKeywordDispath = () => {
  const dispatch = useDispatch();
  return (keyword: string) => {
    dispatch(addRecentSearch({ keyword }));
    dispatch(setKeyword({ keyword }));
    asyncStorageFunc.addPropArrElem(asyncStoragekey.RECENT_SEARCH, keyword);
  };
};

export default useKeywordDispatch;
