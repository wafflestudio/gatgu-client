import { combineReducers } from '@reduxjs/toolkit';

import { postReducer } from './reducers';

const rootReducer = combineReducers({
  post: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
