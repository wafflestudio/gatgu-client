import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {},
});

// export const {} = postsSlice.actions;
export default postsSlice.reducer;
