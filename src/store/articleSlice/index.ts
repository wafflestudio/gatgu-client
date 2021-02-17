import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import { IArticleSumProps } from '@/types/article';
import { AppThunk } from '@/store';
import { AxiosResponse, AxiosError } from 'axios';

export interface IArticleSlice {
  page: number;
  hasError: boolean;
  data: IArticleSumProps[];
  pageLimit: number;
}

interface IArticlePayload {
  data: IArticleSumProps[];
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
};

// article store + basic action
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // if getting data  successfully
    getArticleSuccess: (state, { payload }: PayloadAction<IArticlePayload>) => {
      state.data.push(...payload.data);
      state.hasError = false;
      state.page += 1;
    },

    // if getting data fail, show error screen by hasError state.
    getArticleFailure: (state) => {
      state.hasError = true;
    },

    setPageLimit: (state, { payload }: PayloadAction<IPageLimitPayload>) => {
      state.pageLimit = payload.pageLimit.limit;
    },
  },
});

const {
  getArticleSuccess,
  getArticleFailure,
  setPageLimit,
} = articleSlice.actions;

// Asynchronous thunk action
export const getArticlesPerPage = (page: number): AppThunk => (dispatch) => {
  articleAPI
    .readAll(page)
    .then((response: AxiosResponse) => {
      dispatch(getArticleSuccess({ data: response.data }));
    })
    .catch((err: AxiosError) => {
      console.error(err);
      dispatch(getArticleFailure());
    });
};

// TODO: check
// pagination하면 원래 페이지 크기도 오나요?
export const getPageLimit = (): AppThunk => (dispatch) => {
  articleAPI
    .readPageLimit()
    .then((response: AxiosResponse) => {
      dispatch(setPageLimit(response.data));
    })
    .catch((err: AxiosError) => console.log(err));
};

export default articleSlice.reducer;
