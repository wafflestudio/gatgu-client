import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProps } from '@/types/user';
import { userAPI } from '@/apis';
import { AppThunk } from '@/store';
import { setToken, removeToken } from '@/apis/BaseInstance';

const initialState = {
  info: {
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
  },
  logged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<IUserProps>) {
      state.info = { ...action.payload };
      // TODO: set session storage info
    },
    clearInfo(state) {
      state = { ...initialState };
      // TODO: remove session storage info
    },
    setLogged(state, action) {
      state.logged = action.payload;
    },
  },
});

export const { setInfo, clearInfo } = userSlice.actions;
export default userSlice.reducer;

// thunk function
export const login = (id: string, pw: string): AppThunk => (dispatch) => {
  userAPI
    .login(id, pw)
    .then((response) => {
      setToken(response.data.token);
      dispatch(setInfo(response.data));
    })
    .catch((err) => {
      console.error(err);
      // 에러 종류에 따라 추가적인 로직이 필요:
      // 1. 존재하지 않는 아이디
      // 2. 비밀번호 틀림
      // 3. 통신 오류
      // 각각 alert로 처리할 예정인데 백엔드에서 200 OK밖에 안 정해주셔서 error code api가 확정되어야 구현 가능
    });
};

export const logout = (): AppThunk => (dispatch) => {
  userAPI
    .logout()
    .then(() => {
      removeToken();
      dispatch(clearInfo());
    })
    .catch((err: any) => {
      console.error(err);
      // login과 동일한 상황
    });
};
