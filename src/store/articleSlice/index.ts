import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import {
  IArticleProps,
  IArticleSumProps,
  IGetArticleSumSuccessPayload,
  IGetArticleSumFailPayload,
  IArticleSumResponse,
  TLoad,
} from '@/types/article';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import { AxiosResponse, AxiosError } from 'axios';
import { initialArticle } from '@/constants/InitialState';
import { MAX_ARTICLE_NUM, PAGE_SIZE } from '@/constants/Enum';

export interface IArticleSlice {
  hasError: boolean;
  errorStatus: number;
  data: IArticleSumProps[];
  isLoading: boolean;
  next?: string;
  previous?: string;
  currentArticle: IArticleProps;
}

const initialState: IArticleSlice = {
  hasError: false,
  errorStatus: -100,
  data: [],
  isLoading: false,
  next: '',
  previous: '',
  currentArticle: initialArticle,
};

// article store + basic action
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // if getting data  successfully
    getArticleSumSuccess: (
      state,
      { payload }: PayloadAction<IGetArticleSumSuccessPayload>
    ) => {
      switch (payload.type) {
        case 'first':
          state.data = payload.data;
          break;
        case 'next':
          state.data.push(...payload.data);

          // 리덕스에 저장되는 article 갯수 제한
          if (state.data.length > MAX_ARTICLE_NUM)
            state.data.splice(0, PAGE_SIZE);
          break;
        case 'previous':
          state.data.unshift(...payload.data);

          // 리덕스에 저장되는 article 갯수 제한
          if (state.data.length > MAX_ARTICLE_NUM)
            state.data.splice(MAX_ARTICLE_NUM - PAGE_SIZE, PAGE_SIZE);
          break;
      }

      state.hasError = false;
      state.isLoading = false;
      state.next = payload.next;
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

    setCurrentArticle: (state, { payload }: PayloadAction<IArticleProps>) => {
      state.currentArticle = payload;
    },
  },
});

const {
  getArticleSumSuccess,
  getArticleSumFailure,
  setLoading,
  setCurrentArticle,
} = articleSlice.actions;

// Asynchronous thunk action
export const getArticlesSum = (type: TLoad): AppThunk => (
  dispatch,
  getState
) => {
  dispatch(setLoading());

  const url =
    type === 'first'
      ? null
      : type === 'next'
      ? getState().article.next
      : getState().article.previous;
  articleAPI
    .getArticlesSummary(url)
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

// get single article
export const getSingleArticle = (id: number): AppThunk => (dispatch) => {
  articleAPI
    .getSingleArticle(id)
    .then((response: AxiosResponse) => {
      dispatch(setCurrentArticle(response.data));
    })
    .catch((err: AxiosError) => {
      console.log(err);
    });
};

export default articleSlice.reducer;
