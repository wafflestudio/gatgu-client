import { ArticleType } from '@/types/navigation';
import {
  CombinedState,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { articleAPI } from '@/apis';
import { AppThunk } from '@/store';

const initialState = {
  title: '',
  people_count: 0,
  price: 0,
  location: '',
  description: '',
  product_url: '',
  // thumbnail_url: [''],
  temp_author_id: 0,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    putArticles(state, action: PayloadAction<ArticleType>) {
      state = action.payload;
    },
  },
});

export const { putArticles } = articleSlice.actions;
export default articleSlice.reducer;

// thunk function
export const postArticle = (article: ArticleType): AppThunk => async (
  dispatch
) => {
  try {
    const res = await articleAPI.create(article);
    dispatch(putArticles(res.data));
  } catch (err) {
    console.log(err);
  }
};
