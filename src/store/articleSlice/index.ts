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
import { AppThunk } from '@/store';
import {
  IArticleProps,
  IArticleSumProps,
  IGetArticleSumSuccessPayload,
  IGetFailPayload,
  IArticleSumResponse,
  TLoad,
} from '@/types/article';

import * as RootNavigation from '../../../RootNavigation';

// CHECK:

// TODO: @juimdpp
// currentArticle도 getSuccess, getFail 함수 만들어도 괜찮을듯
// when: ~3/12

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
  WriteArticleIsLoading: true,
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

    setCurrentArticle: (state, { payload }: PayloadAction<IArticleProps>) => {
      state.currentArticle = payload;
      state.GetArticleHasError = false;
      state.GetArticleIsLoading = true;
    },

    doneGettingSingleArticle: (state) => {
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

    writeArticleFailure: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.WriteArticleErrorStatus = payload.errorStatus;
      state.WriteArticleHasError = true;
      state.WriteArticleIsLoading = false;
    },

    writeArticleLoading: (state) => {
      console.log('distress');
      state.WriteArticleIsLoading = true;
    },
  },
});

const {
  getArticleSumSuccess,
  getArticleSumFailure,
  writeArticleFailure,
  writeArticleLoading,
  setLoading,
  setCurrentArticle,
  getSingleArticleFail,
  doneGettingSingleArticle,
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
  articleAPI
    .getSingleArticle(id)
    .then((response: AxiosResponse) => {
      dispatch(setCurrentArticle(response.data));
    })
    .then(() => {
      dispatch(doneGettingSingleArticle());
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(getSingleArticleFail({ errorStatus: err.response.status }));
      } else {
        dispatch(getSingleArticleFail({ errorStatus: UNKNOWN_ERR }));
      }
      // TODO: @juimdpp
      // todo: handle error appropriately (아마 에러 페이지 띄우기..?)
      // when: 로딩 페이지 구현할 때 같이 할게요
    });
};

export const editSingleArticle = (
  id: number,
  body: IArticleProps
): AppThunk => (dispatch) => {
  articleAPI
    .editArticle(id, body)
    .then((res: AxiosResponse) => {
      dispatch(setCurrentArticle(res.data));
      return res.data.article_id;
    })
    .then((id: number) => {
      RootNavigation.navigate('ArticlePage', {
        id: id,
      });
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(writeArticleFailure({ errorStatus: err.response.status }));
      } else {
        dispatch(writeArticleFailure({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

export const createSingleArticle = (body: IArticleProps): AppThunk => (
  dispatch
) => {
  // dispatch(writeArticleLoading())

  articleAPI
    .create(body)
    .then((res: AxiosResponse) => {
      dispatch(setCurrentArticle(res.data));
      return res.data.article_id;
    })
    .then((id: number) => {
      RootNavigation.navigate('ArticlePage', {
        id: id,
      });
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(writeArticleFailure({ errorStatus: err.response.status }));
      } else {
        dispatch(writeArticleFailure({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

export default articleSlice.reducer;
