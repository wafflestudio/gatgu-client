import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import {
  IArticleSumProps,
  IGetSuccessPayloadV1,
  IGetFailPayload,
} from '@/types/article';
import { AppThunk } from '@/store';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
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
    getArticleSuccess(state, { payload }: PayloadAction<IGetSuccessPayloadV1>) {
      state.data.push(...payload.data);
      state.isLoading = false;
      state.hasError = false;
      state.next = payload.next;
      state.previous = payload.pervieous;
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

const initSearchData = (): AppThunk => (dispatch) => {
  // TODO:
  // use redux persist
  dispatch(
    setRecentSearch({
      data: [
        '검색어1',
        '검색어2',
        '검색어3',
        '검색어4',
        '검색어5',
        '검색어6',
        '검색어7',
        '검색어8',
        '검색어9',
        '검색어10',
      ],
    })
  );
  SearchAPI.getPopularSearchKeyword().then((res) => {
    dispatch(setPopularSearch({ data: res }));
  });
};

export { setKeyword, searchArticles, loadNextArticles, initSearchData };

export default searchedArticleSlice.reducer;
