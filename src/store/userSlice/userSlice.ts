import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  isLogined: boolean;
}

const initialState: userState = {
  isLogined: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginState(state, action: PayloadAction<userState['isLogined']>) {
      state.isLogined = action.payload;
    },
  },
});

export const { setLoginState } = userSlice.actions;
export default userSlice.reducer;
