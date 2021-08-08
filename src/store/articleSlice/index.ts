import { AxiosResponse, AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { articleAPI } from '@/apis';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { OrderStatus } from '@/enums';
import { AppThunk } from '@/store';
import { IArticleProps, IGetFailPayload, IPostArticle } from '@/types/article';

export interface IArticleSlice {
  hasError: boolean;
  errorStatus: number;
  isLoading: boolean;
  currentArticle: IArticleProps;
  articleIsLoading: boolean;
  articleHasError: boolean;
  articleErrorStatus: number;
  WriteArticleHasError: boolean;
  WriteArticleErrorStatus: number;
  WriteArticleIsLoading: boolean;
  newId: number;
}

const initialState: IArticleSlice = {
  hasError: false,
  errorStatus: -100,
  isLoading: false,
  currentArticle: {
    writer_id: 0,
    article_id: 0,
    title: '',
    description: '',
    trading_place: '',
    product_url: '',
    price_min: 0,
    time_in: new Date().getTime(),
    images: [],
    tag: [],
    created_at: new Date().getTime(), // should be date but json server doesn't accept Date
    updated_at: new Date().getTime(),
    article_status: {
      progress_status: 1,
      cur_price_sum: 0,
    },
    order_chat: {
      id: 0,
      participant_profile: [],
      tracking_number: 0,
      order_status: OrderStatus.Pending,
    },
  },
  articleIsLoading: true,
  articleHasError: false,
  articleErrorStatus: -100,
  WriteArticleHasError: false,
  WriteArticleErrorStatus: -100,
  WriteArticleIsLoading: false,
  newId: -1,
};

// article store + basic action
const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    getSingleArticleSuccess: (
      state,
      { payload }: PayloadAction<IArticleProps>
    ) => {
      state.currentArticle = payload;
      state.articleHasError = false;
      state.articleIsLoading = false;
    },

    getSingleArticleFail: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.articleHasError = true;
      state.articleIsLoading = false;
      state.articleErrorStatus = payload.errorStatus;
    },
    getSingleArticleLoading: (state) => {
      state.articleIsLoading = true;
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
  writeArticleFailure,
  writeArticleSuccess,
  writeArticleLoading,
  getSingleArticleSuccess,
  getSingleArticleFail,
  getSingleArticleLoading,
} = articleSlice.actions;

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

export const editSingleArticle = (id: number, body: IPostArticle): AppThunk => {
  return async (dispatch) => {
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
};

export const createSingleArticle = (body: IPostArticle): AppThunk => {
  return async (dispatch) => {
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
