import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  IArticleSumProps,
  IGetSuccessPayload,
  IGetFailPayload,
} from '@/types/article';
import { AppThunk } from '@/store';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { articleAPI, SearchAPI } from '@/apis';

export interface ISearchedArticleSlice {
  data: IArticleSumProps[];
  hasError: boolean;
  errorStatus: number;
  isLoading: boolean;
  next: string;
  previous: string;
  keyword: string;
  recentSearch: string[];
  popularSearch: string[];
}

interface ISetKeywordPayload {
  keyword: string;
}

interface IKeywordListPayload {
  data: string[];
}

// interface I

const initialState: ISearchedArticleSlice = {
  data: [],
  hasError: false,
  errorStatus: -100,
  isLoading: false,
  next: '',
  previous: '',
  keyword: '',
  recentSearch: [],
  popularSearch: [],
};

const searchedArticleSlice = createSlice({
  name: 'searchedArticle',
  initialState,
  reducers: {
    getArticleSuccess(state, { payload }: PayloadAction<IGetSuccessPayload>) {
      state.data.push(...payload.data);
      state.isLoading = false;
      state.hasError = false;
      state.next = payload.next;
      state.previous = payload.previous;
    },
    getArticleFailure(state, { payload }: PayloadAction<IGetFailPayload>) {
      state.isLoading = false;
      state.hasError = true;
      state.errorStatus = payload.errorStatus;
    },
    setLoading(state) {
      state.isLoading = true;
    },
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
    setPopularSearch(state, { payload }: PayloadAction<IKeywordListPayload>) {
      state.popularSearch = payload.data;
    },
  },
});

const {
  getArticleSuccess,
  getArticleFailure,
  setLoading,
  setKeyword,
  setRecentSearch,
  setPopularSearch,
  addRecentSearch,
  removeKeyword,
} = searchedArticleSlice.actions;

const searchArticles = (keyword: string): AppThunk => (dispatch) => {
  dispatch(setLoading());
  dispatch(setKeyword({ keyword }));
  // Todo
  // replace this with real api function.
  articleAPI
    .readAll(1)
    .then((res: AxiosResponse) => {
      dispatch(getArticleSuccess(res.data));
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(getArticleFailure({ errorStatus: err.response.status }));
      } else {
        dispatch(getArticleFailure({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

const loadNextArticles = (): AppThunk => (dispatch) => {
  dispatch(setLoading());
  // Todo
  // replace this with real api function.
  articleAPI
    .readAll(2)
    .then((res: AxiosResponse) => {
      dispatch(getArticleSuccess(res.data));
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(getArticleFailure({ errorStatus: err.response.status }));
      } else {
        dispatch(getArticleFailure({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

// 초기에 popularSearch와 RecentSearch 설정
const initSearchData = (): AppThunk => (dispatch) => {
  SearchAPI.getPopularSearchKeyword().then((res) => {
    dispatch(setPopularSearch({ data: res }));
  });
  AsyncStorage.getItem(asyncStoragekey.RECENT_SEARCH)
    .then((res) => {
      if (res === null) {
        dispatch(setRecentSearch({ data: [] }));
      } else {
        dispatch(setRecentSearch({ data: JSON.parse(res) }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  setKeyword,
  addRecentSearch,
  removeKeyword,
  searchArticles,
  loadNextArticles,
  initSearchData,
};

export default searchedArticleSlice.reducer;
