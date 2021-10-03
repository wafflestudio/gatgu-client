import { combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';

import articleReducer from './articleSlice';
import chatReducer from './chatSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  article: articleReducer,
  user: userReducer,
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default rootReducer;
