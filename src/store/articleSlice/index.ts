import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import {
  IArticleProps,
  IArticleSumProps,
  IGetSuccessPayload,
  IGetFailPayload,
} from '@/types/article';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import { AxiosResponse, AxiosError } from 'axios';
import { initialArticle } from '@/constants/InitialState';

// TODO: @juimdpp
// currentArticle도 getSuccess, getFail 함수 만들어도 괜찮을듯
// todo: 로딩 페이지 구현할 때

export interface IArticleSlice {
  hasError: boolean;
  errorStatus: number;
  data: IArticleSumProps[];
  isLoading: boolean;
  next: string;
  previous: string;
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
      { payload }: PayloadAction<IGetSuccessPayload>
    ) => {
      state.data.push(...payload.data);
      state.hasError = false;
      state.isLoading = false;
      state.next = payload.next;
      state.previous = payload.previous;
    },

    // if getting data fail, show error screen by hasError state.
    getArticleSumFailure: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
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
export const getArticlesPerPage = (): AppThunk => (dispatch) => {
  dispatch(setLoading());
  articleAPI
    // TODO: @ssu1018
    //   replace this with real api function.
    .readAll(1)
    .then((response: AxiosResponse) => {
      dispatch(
        getArticleSumSuccess({ data: response.data, next: '', previous: '' })
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

export const loadNextArticles = (): AppThunk => (dispatch) => {
  dispatch(setLoading());
  articleAPI
    // TODO: @ssu1018
    //   replace this with real api function.
    .readAll(2)
    .then((res: AxiosResponse) => {
      dispatch(
        getArticleSumSuccess({ data: res.data, next: '', previous: '' })
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
    .catch(() => {
      // TODO: @juimdpp
      // todo: handle error appropriately (아마 에러 페이지 띄우기..?)
      // when: 로딩 페이지 구현할 때 같이 할게요
    });
};

export default articleSlice.reducer;
