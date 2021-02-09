import { ArticleType } from '@/types/navigation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postArticleApi } from '@/apis/ArticleApi';
import { AppThunk } from '@/store';

const initialState = {
  title: '',
  people_count: 0,
  price: 0,
  location: '',
  description: '',
  product_url: '',
  thumbnail_url: [''],
  temp_author_id: 0,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    putArticles(state, action: PayloadAction<ArticleType>) {
      console.log('reducer');
      state.title = action.payload.title;
      state.people_count = action.payload.people_count;
      state.price = action.payload.price;
      state.location = action.payload.location;
      state.description = action.payload.description;
      state.product_url = action.payload.product_url;
      // state.thumbnail_url = action.payload.thumbnail_url;
      state.temp_author_id = action.payload.temp_author_id;
    },
  },
});

export const { putArticles } = articleSlice.actions;
export default articleSlice.reducer;

// thunk function
export const postArticle = (article: ArticleType): AppThunk => {
  return async (dispatch) => {
    console.log('Thunk function');
    console.log(article);
    try {
      const res = await postArticleApi(article);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // return await postArticleApi(article)
    //     .then((res) => {
    //       console.log(res)
    //       dispatch(putArticles(article))
    //     }, (error) => console.log(error))
    // console.log("Dispatching to reducer")
  };
};
