import { AxiosResponse, AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { articleAPI } from '@/apis';
import {
  IGetArticleSumSuccessPayload,
  IGetArticleSumFailPayload,
  IArticleSumResponse,
  TLoad,
  TSearchType,
} from '@/types/article';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import {
  MAX_ARTICLE_NUM,
  PAGE_SIZE,
  GetArticleSumStatus,
} from '@/constants/article';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { IArticleSliceBasis } from '@/types/article';
import { Alert } from 'react-native';

export interface ISearchedArticleSlice extends IArticleSliceBasis {
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
  hasError: false,
  errorStatus: -100,
  data: [],
  isLoading: false,
  next: '',
  previous: '',
  isLastPage: false,
  isFirstPage: true,
  keyword: '',
  recentSearch: [],
};

const searchedArticleSlice = createSlice({
  name: 'searchedArticle',
  initialState,
  reducers: {
    getArticleSumSuccess: (
      state,
      { payload }: PayloadAction<IGetArticleSumSuccessPayload>
    ) => {
      switch (payload.type) {
        case GetArticleSumStatus.FIRST:
          state.data = payload.data;
          break;
        case GetArticleSumStatus.NEXT:
          state.data.push(...payload.data);
          // 리덕스에 저장되는 article 갯수 제한
          if (state.data.length > MAX_ARTICLE_NUM)
            state.data.splice(0, PAGE_SIZE);

          break;
        case GetArticleSumStatus.PREVIOUS:
          state.data.unshift(...payload.data);
          // 리덕스에 저장되는 article 갯수 제한
          if (state.data.length > MAX_ARTICLE_NUM)
            state.data.splice(MAX_ARTICLE_NUM - PAGE_SIZE, PAGE_SIZE);
          break;
        default:
          break;
      }
      state.hasError = false;
      state.isLoading = false;
      state.isLastPage = payload.next === null;
      state.next = payload.next;
      state.isFirstPage = payload.previous === null;
      state.previous = payload.previous;
    },

    // if getting data fail, show error screen by hasError state.
    getArticleSumFailure: (
      state,
      { payload }: PayloadAction<IGetArticleSumFailPayload>
    ) => {
      state.hasError = true;
      state.isLoading = false;
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
  },
});

const {
  getArticleSumSuccess,
  getArticleSumFailure,
  setKeyword,
  setRecentSearch,
  addRecentSearch,
  removeKeyword,
} = searchedArticleSlice.actions;

const searchArticles = (
  type: TLoad,
  keyword: string,
  searchType: TSearchType
): AppThunk => (dispatch, getState) => {
  const url =
    type === GetArticleSumStatus.FIRST
      ? null
      : type === GetArticleSumStatus.NEXT
      ? getState().article.next
      : getState().article.previous;
  articleAPI
    .getArticleSummary(url, keyword, searchType)
    .then((response: AxiosResponse<IArticleSumResponse>) => {
      dispatch(
        getArticleSumSuccess({
          data: response.data.results,
          next: response.data.next,
          previous: response.data.previous,
          type: type,
        })
      );
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(getArticleSumFailure({ errorStatus: err.response.status }));
      } else {
        dispatch(getArticleSumFailure({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

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
    .catch((err) => {
      Alert.alert('최근 검색 데이터를 불러오지 못했습니다.');
    });
};

export {
  setKeyword,
  addRecentSearch,
  removeKeyword,
  searchArticles,
  initSearchData,
};

export default searchedArticleSlice.reducer;
