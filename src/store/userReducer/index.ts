import { createSlice } from '@reduxjs/toolkit';
import { user } from '@/apis';

const initialState = {
  id: 'userid (integer)',
  username: 'username (string)',
  password: 'password (string)',
  email: 'email (string)',
  first_name: 'first_name (string)',
  last_name: 'last_name (string)',
  userprofile: {
    profile_id: 'profile id (integer)',
    picture: 'picture url (url or string)',
    nickname: 'nickname (string)',
    address: 'address (string)',
    phonenumber: 'phone number (string)',
  },
  created_at: 'created time (time)',
  updated_at: 'updated time (time)',
  is_active: 'user is active or not (boolean)',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, action) {
      state.id = 'a';
    },
  },
});

export const { setInfo } = userSlice.actions;
export default userSlice.reducer;

// thunk function
export const login = (id: string, pw: string): UserThunk => (dispatch: any) => {
  user
    .login(id, pw)
    .then((response) => {
      dispatch(setInfo(response.data));
    })
    .catch((err: any) => console.error(err));
};
