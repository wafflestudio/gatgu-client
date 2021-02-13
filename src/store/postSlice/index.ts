import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import { IPostProps } from '@/types/post';
import { AppThunk } from '@/store';

export interface IPostSlice {
  page: number;
  hasError: boolean;
  data: IPostProps[];
  pageLimit: number;
}

interface IPostsPayload {
  data: IPostProps[];
}

interface IPageLimitPayload {
  pageLimit: {
    limit: number;
  };
}

const initialState: IPostSlice = {
  page: 1,
  hasError: false,
  data: [],
  pageLimit: 1,
};

// post store + basic action
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // if getting data  successfully
    getPostsSuccess: (state, { payload }: PayloadAction<IPostsPayload>) => {
      state.data.push(...payload.data);
      state.hasError = false;
      state.page += 1;
    },

    // if getting data fail, show error screen by hasError state.
    getPostsFailure: (state) => {
      state.hasError = true;
    },

    setPageLimit: (state, { payload }: PayloadAction<IPageLimitPayload>) => {
      state.pageLimit = payload.pageLimit.limit;
    },
  },
});

const { getPostsSuccess, getPostsFailure, setPageLimit } = postsSlice.actions;

// Asynchronous thunk action
export const getPostsPerPage = (page: number): AppThunk => async (dispatch) => {
  try {
    const response = await articleAPI.readAll(page);
    dispatch(getPostsSuccess({ data: response.data }));
  } catch (err) {
    console.error(err);
    dispatch(getPostsFailure());
  }
};

export const getPageLimit = (): AppThunk => async (dispatch) => {
  try {
    const response = await articleAPI.readPageLimit();
    dispatch(setPageLimit(response.data));
  } catch (err) {
    console.log(err);
  }
};

export default postsSlice.reducer;
