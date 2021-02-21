import { useDispatch } from 'react-redux';
import { setKeyword } from '@/store/searchedArticleSlice';

type TUseKeywordDispath = () => (keyword: string) => void;

const useKeywordDispatch: TUseKeywordDispath = () => {
  const dispatch = useDispatch();
  return (keyword: string) => {
    dispatch(setKeyword({ keyword }));
  };
};

export default useKeywordDispatch;
