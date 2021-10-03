import { AxiosResponse, AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { articleAPI } from '@/apis';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import { IArticleProps, IGetFailPayload } from '@/types/article';

export interface IArticleSlice {
  error: any;
  isLoading: boolean;
  currentArticle: IArticleProps;
}

const initialState: IArticleSlice = {
  error: null,
  isLoading: true,
  currentArticle: {
    writer: { id: 0, profile_img: '', nickname: '' },
    article_id: 0,
    title: '',
    description: '',
    trading_place: '',
    product_url: '',
    price_min: 0,
    time_in: new Date().getTime(),
    images: [],
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
    },
  },
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
      state.error = null;
      state.isLoading = false;
    },

    getSingleArticleFail: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
    getSingleArticleLoading: (state) => {
      state.isLoading = true;
    },
    resetArticle: (state) => {
      state.currentArticle = initialState.currentArticle;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
  },
});

const {
  getSingleArticleSuccess,
  getSingleArticleFail,
  getSingleArticleLoading,
  resetArticle,
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
        dispatch(getSingleArticleFail({ error: err.response }));
      } else {
        dispatch(getSingleArticleFail({ error: UNKNOWN_ERR }));
      }
    });
};

export { resetArticle };

export default articleSlice.reducer;
