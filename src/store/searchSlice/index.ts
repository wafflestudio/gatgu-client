import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { asyncStoragekey } from '@/constants/asyncStorage';
import { AppThunk } from '@/store';

export interface ISearchedArticleSlice {
  keyword: string;
  recentSearch: string[];
}

interface ISetKeywordPayload {
  keyword: string;
}

interface IKeywordListPayload {
  data: string[];
}

const initialState: ISearchedArticleSlice = {
  keyword: '',
  recentSearch: [],
};

const searchedArticleSlice = createSlice({
  name: 'searchedArticle',
  initialState,
  reducers: {
    setKeyword(state, { payload }: PayloadAction<ISetKeywordPayload>) {
      state.keyword = payload.keyword;
    },
    setRecentSearch(state, { payload }: PayloadAction<IKeywordListPayload>) {
      state.recentSearch = payload.data;
    },
    addRecentSearch(state, { payload }: PayloadAction<ISetKeywordPayload>) {
      state.recentSearch.unshift(payload.keyword);
    },
    removeKeyword(state, { payload }: PayloadAction<ISetKeywordPayload>) {
      const targetInd = state.recentSearch.indexOf(payload.keyword);
      state.recentSearch = state.recentSearch.filter(
        (_, ind) => ind !== targetInd
      );
    },
  },
});

const {
  setKeyword,
  setRecentSearch,
  addRecentSearch,
  removeKeyword,
} = searchedArticleSlice.actions;

// 초기에 popularSearch와 RecentSearch 설정
const initSearchData = (): AppThunk => (dispatch) => {
  AsyncStorage.getItem(asyncStoragekey.RECENT_SEARCH)
    .then((res) => {
      if (res === null) {
        dispatch(setRecentSearch({ data: [] }));
      } else {
        dispatch(setRecentSearch({ data: JSON.parse(res) }));
      }
    })
    .catch(() => {
      Alert.alert('최근 검색 데이터를 불러오지 못했습니다.');
    });
};

export { setKeyword, addRecentSearch, removeKeyword, initSearchData };

export default searchedArticleSlice.reducer;
