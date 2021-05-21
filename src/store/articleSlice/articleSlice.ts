import { AxiosResponse, AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { articleAPI } from '@/apis';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { initialArticle } from '@/constants/InitialState';
import {
  MAX_ARTICLE_NUM,
  PAGE_SIZE,
  GetArticleSumStatus,
} from '@/constants/article';
import { AppThunk, RootState } from '@/store/rootState';
import {
  IArticleProps,
  IArticleSumProps,
  IGetArticleSumSuccessPayload,
  IGetFailPayload,
  IArticleSumResponse,
  TLoad,
} from '@/types/article';

export interface IArticleSlice {
  hasError: boolean;
  errorStatus: number;
  data: IArticleSumProps[];
  isLoading: boolean;
  next: string | null;
  previous: string | null;
  currentArticle: IArticleProps;
  GetArticleIsLoading: boolean;
  GetArticleHasError: boolean;
  GetArticleErrorStatus: number;
  WriteArticleHasError: boolean;
  WriteArticleErrorStatus: number;
  WriteArticleIsLoading: boolean;
  isLastPage: boolean;
  isFirstPage: boolean;
  newId: number;
}

const initialState: IArticleSlice = {
  hasError: false,
  errorStatus: -100,
  data: [],
  isLoading: false,
  next: '',
  previous: '',
  currentArticle: initialArticle,
  GetArticleIsLoading: true,
  GetArticleHasError: false,
  GetArticleErrorStatus: -100,
  WriteArticleHasError: false,
  WriteArticleErrorStatus: -100,
  WriteArticleIsLoading: false,
  isLastPage: false,
  isFirstPage: true,
  newId: -1,
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
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.hasError = true;
      state.isLoading = false;
      state.errorStatus = payload.errorStatus;
    },
    setLoading(state) {
      state.isLoading = true;
    },

    getSingleArticleSuccess: (
      state,
      { payload }: PayloadAction<IArticleProps>
    ) => {
      state.currentArticle = payload;
      state.GetArticleHasError = false;
      state.GetArticleIsLoading = false;
    },

    getSingleArticleFail: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.GetArticleHasError = true;
      state.GetArticleIsLoading = false;
      state.GetArticleErrorStatus = payload.errorStatus;
    },
    getSingleArticleLoading: (state) => {
      state.GetArticleIsLoading = true;
    },

    writeArticleFailure: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.WriteArticleErrorStatus = payload.errorStatus;
      state.WriteArticleHasError = true;
      state.WriteArticleIsLoading = false;
    },

    writeArticleSuccess: (state, { payload }: PayloadAction<IArticleProps>) => {
      state.currentArticle = payload;
      state.WriteArticleHasError = false;
      state.WriteArticleIsLoading = false;
    },

    writeArticleLoading: (state) => {
      state.WriteArticleIsLoading = true;
    },
  },
});

const {
  getArticleSumSuccess,
  getArticleSumFailure,
  writeArticleFailure,
  writeArticleSuccess,
  writeArticleLoading,
  setLoading,
  getSingleArticleSuccess,
  getSingleArticleFail,
  getSingleArticleLoading,
} = articleSlice.actions;

// Asynchronous thunk action
export const getArticlesSum = (type: TLoad): AppThunk => (
  dispatch,
  getState
) => {
  const url =
    type === GetArticleSumStatus.FIRST
      ? null
      : type === GetArticleSumStatus.NEXT
      ? getState().article.next
      : getState().article.previous;
  articleAPI
    .getArticleSummary(url)
    .then((response: AxiosResponse<IArticleSumResponse>) => {
      // TODO: @ssu1018
      //   replace this with real api function.
      // when: 홈 페이지네이션 할 때
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
  dispatch(getSingleArticleLoading());
  articleAPI
    .getSingleArticle(id)
    .then((response: AxiosResponse) => {
      dispatch(getSingleArticleSuccess(response.data));
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(getSingleArticleFail({ errorStatus: err.response.status }));
      } else {
        dispatch(getSingleArticleFail({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

export const editSingleArticle = (
  id: number,
  body: IArticleProps
): AppThunk => (dispatch) => {
  dispatch(writeArticleLoading());
  return articleAPI
    .editArticle(id, body)
    .then((res: AxiosResponse) => {
      dispatch(writeArticleSuccess(res.data));
      return res.data.article_id;
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(writeArticleFailure({ errorStatus: err.response.status }));
        return -1;
      } else {
        dispatch(writeArticleFailure({ errorStatus: UNKNOWN_ERR }));
        return -1;
      }
    });
};

export const createSingleArticle = (body: IArticleProps): AppThunk => {
  return (dispatch) => {
    dispatch(writeArticleLoading());
    return articleAPI
      .create(body)
      .then((res: AxiosResponse) => {
        dispatch(writeArticleSuccess(res.data));
        return res.data.article_id;
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          dispatch(writeArticleFailure({ errorStatus: err.response.status }));
          return -1;
        } else {
          dispatch(writeArticleFailure({ errorStatus: UNKNOWN_ERR }));
          return -1;
        }
      });
  };
};

export default articleSlice.reducer;
