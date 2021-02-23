import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import {
  IArticleSumProps,
  IGetSuccessPayload,
  IGetFailPayload,
} from '@/types/article';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import { AxiosResponse, AxiosError } from 'axios';

export interface IArticleSlice {
  hasError: boolean;
  errorStatus: number;
  data: IArticleSumProps[];
  isLoading: boolean;
  next: string;
  previous: string;
}

const initialState: IArticleSlice = {
  hasError: false,
  errorStatus: -100,
  data: [],
  isLoading: false,
  next: '',
  previous: '',
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
  },
});

const {
  getArticleSumSuccess,
  getArticleSumFailure,
  setLoading,
} = articleSlice.actions;

// Asynchronous thunk action
export const getArticlesPerPage = (): AppThunk => (dispatch) => {
  dispatch(setLoading());
  articleAPI
    // TODO:
    // replace this with real api function.
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
    // TODO:
    // replace this with real api function.
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

export default articleSlice.reducer;
