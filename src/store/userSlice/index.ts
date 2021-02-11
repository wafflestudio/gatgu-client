import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/types/navigation';
import { user } from '@/apis';
import { UserThunk } from '@/store';
import { setToken, removeToken } from '@/apis/BaseInstance';

const initialState = {
  id: 0,
  username: '',
  password: '',
  email: '',
  first_name: '',
  last_name: '',
  userprofile: {
    profile_id: 0,
    picture: '',
    nickname: '',
    address: '',
    phonenumber: '',
  },
  created_at: null,
  updated_at: null,
  is_active: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<UserType>) {
      state = { ...action.payload };
      // TODO: set session storage info
    },
    clearInfo(state) {
      state = { ...initialState };
      // TODO: remove session storage info
    },
  },
});

export const { setInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;

// thunk function
export const login = (id: string, pw: string): UserThunk => (dispatch) => {
  user
    .login(id, pw)
    .then((response) => {
      setToken(response.data.token);
      dispatch(setInfo(response.data));
    })
    .catch((err: any) => console.error(err));
};

export const logout = (): UserThunk => (dispatch) => {
  user
    .logout()
    .then(() => {
      removeToken();
      dispatch(clearInfo());
    })
    .catch((err: any) => console.log(err));
};
