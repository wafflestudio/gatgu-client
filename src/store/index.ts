import { combineReducers, ThunkAction } from '@reduxjs/toolkit';

import postReducer from './postReducer';

const rootReducer = combineReducers({
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type UserThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export default rootReducer;
