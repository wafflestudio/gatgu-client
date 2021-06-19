import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  accessToken: string | null;
}

const initialState: userState = {
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<userState['accessToken']>) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = userSlice.actions;
export default userSlice.reducer;
