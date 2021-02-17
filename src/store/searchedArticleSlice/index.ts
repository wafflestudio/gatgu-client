import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import {
  IArticleSumProps,
  IGetSuccessPayloadV1,
  IGetFailPayload,
} from '@/types/article';
import { AppThunk } from '@/store';

import * as articleApi from '@/apis/ArticleApi';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';

export interface ISearchedArticleSlice {
  data: IArticleSumProps[];
  hasError: boolean;
  errorStatus: number;
  isLoading: boolean;
  next: string;
  previous: string;
  keyword: string;
}

interface ISetKeywordPayload {
  keyword: string;
}

const initialState: ISearchedArticleSlice = {
  data: [],
  hasError: false,
  errorStatus: -100,
  isLoading: false,
  next: '',
  previous: '',
  keyword: '',
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
  },
});

const {
  getArticleSuccess,
  getArticleFailure,
  setLoading,
  setKeyword,
} = searchedArticleSlice.actions;

export const searchArticles = (keyword: string): AppThunk => (dispatch) => {
  dispatch(setLoading());
  dispatch(setKeyword({ keyword }));
  // Todo
  // replace this with real api function.
  articleApi
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

export const loadNextArticles = (): AppThunk => (dispatch) => {
  dispatch(setLoading());
  // Todo
  // replace this with real api function.
  articleApi
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

export default searchedArticleSlice.reducer;
