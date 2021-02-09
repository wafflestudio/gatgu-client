import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: [],
  reducers: {
    // getArticles(state, action: PayloadAction<number>) {},
  },
});

// export const {} = articleSlice.actions;
export default articleSlice.reducer;
