import { combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';

import articleReducer from './articleSlice';
import userReducer from './userSlice';
import searchedReducer from './searchSlice';

const rootReducer = combineReducers({
  article: articleReducer,
  user: userReducer,
  search: searchedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default rootReducer;
