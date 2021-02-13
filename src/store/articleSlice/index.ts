import { ArticleType } from '@/types/navigation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setArticle(state, action: PayloadAction<ArticleType>) {
      state = action.payload;
    },
  },
});

export const { setArticle } = articleSlice.actions;
export default articleSlice.reducer;

// thunk function
export const postArticle = (article: ArticleType): AppThunk => (dispatch) => {
  articleAPI
    .create(article)
    .then((response) => {
      dispatch(setArticle(response.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
