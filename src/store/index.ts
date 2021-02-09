import { combineReducers } from '@reduxjs/toolkit';

import postReducer from './postReducer';
import articleReducer from './articleSlice';

const rootReducer = combineReducers({
  post: postReducer,
  article: articleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
