import { combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';

import postReducer from './postReducer';
import articleReducer from './articleSlice';

const rootReducer = combineReducers({
  post: postReducer,
  article: articleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type UserThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default rootReducer;
