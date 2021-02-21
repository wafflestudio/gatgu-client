import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import {
  IArticleProps,
  IArticleSumProps,
  IGetSuccessPayload,
} from '@/types/article';
import { AppThunk } from '@/store';
import { AxiosResponse, AxiosError } from 'axios';
import { initialArticle } from '@/constants/InitialState';

// CHECK:
// 이 페이지 getArticleSucess --> getArticleSumSuccess 등으로 바꿔야할듯. (의견 코멘트로 남겨주면 수정할게요)
// currentArticle도 getSuccess, getFail 함수 만들어도 괜찮을듯

export interface IArticleSlice {
  page: number;
  hasError: boolean;
  data: IArticleSumProps[];
  pageLimit: number;
  currentArticle: IArticleProps;
}

interface IPageLimitPayload {
  pageLimit: {
    limit: number;
  };
}

const initialState: IArticleSlice = {
  page: 1,
  hasError: false,
  data: [],
  pageLimit: 1,
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
      { payload }: PayloadAction<IGetSuccessPayload>
    ) => {
      state.data.push(...payload.data);
      state.hasError = false;
      state.page += 1;
    },

    // if getting data fail, show error screen by hasError state.
    getArticleSumFailure: (state) => {
      state.hasError = true;
    },

    setPageLimit: (state, { payload }: PayloadAction<IPageLimitPayload>) => {
      state.pageLimit = payload.pageLimit.limit;
    },

    setCurrentArticle: (state, { payload }: PayloadAction<IArticleProps>) => {
      state.currentArticle = payload;
    },
  },
});

const {
  getArticleSumSuccess,
  getArticleSumFailure,
  setPageLimit,
  setCurrentArticle,
} = articleSlice.actions;

// Asynchronous thunk action
export const getArticlesPerPage = (page: number): AppThunk => (dispatch) => {
  articleAPI
    .readAll(page)
    .then((response: AxiosResponse) => {
      dispatch(getArticleSumSuccess({ data: response.data }));
    })
    .catch((err: AxiosError) => {
      console.error(err);
      dispatch(getArticleSumFailure());
    });
};

// TODO: check
// Fix Me!!!
export const getPageLimit = (): AppThunk => (dispatch) => {
  articleAPI
    .readPageLimit()
    .then((response: AxiosResponse) => {
      dispatch(setPageLimit(response.data));
    })
    .catch((err: AxiosError) => console.log(err));
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
