import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './';
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
