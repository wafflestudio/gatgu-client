import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '@/apis/PostApi';
import { IPostProps } from '@/types/post';
import { AppThunk } from '@/store';

export interface IPostSlice {
  hasError: boolean;
  data: IPostProps[];
}

interface IPostsPayload {
  data: IPostProps[];
}

const initialState: IPostSlice = {
  hasError: false,
  data: [],
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
    },

    // if getting data fail, show error screen by hasError state.
    getPostsFailure: (state) => {
      state.hasError = true;
    },
  },
});

const { getPostsSuccess, getPostsFailure } = postsSlice.actions;

// Asynchronous thunk action
export const getPostsPerPage = (page: number): AppThunk => async (dispatch) => {
  try {
    const response = await getPosts(page);
    dispatch(getPostsSuccess({ data: response.data }));
  } catch (error) {
    dispatch(getPostsFailure());
  }
};

export default postsSlice.reducer;
