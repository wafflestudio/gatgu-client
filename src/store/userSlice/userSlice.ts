import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  token: string | null;
}

const initialState: userState = {
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<userState['token']>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = userSlice.actions;
export default userSlice.reducer;
