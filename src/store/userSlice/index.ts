import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProps } from '@/types/user';
import { userAPI } from '@/apis';
import { AppThunk } from '@/store';
import { setToken, removeToken } from '@/apis/BaseInstance';
import { NavigationProp } from '@react-navigation/native';

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
      grade: 0,
      point: 0,
      updated_at: null,
      withdrew_at: null,
    },
    is_active: false,
    date_joined: null,
  },
  logged: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo(state, action: PayloadAction<IUserProps>) {
      state.info = { ...action.payload };
      state.logged = true;
      // TODO: set asyncStorage info
    },
    clearInfo(state) {
      state.info = { ...initialState.info };
      state.logged = false;
      // TODO: clear asyncStorage info
    },
    setLogged(state, action) {
      state.logged = { ...action.payload };
    },
  },
});

export const { setInfo, clearInfo, setLogged } = userSlice.actions;
export default userSlice.reducer;

// thunk functions
export const login = (
  id: string,
  pw: string,
  navigation: NavigationProp<any>
): AppThunk => (dispatch) => {
  userAPI
    .login(id, pw)
    .then((response) => {
      setToken(response.data.token);
      dispatch(setInfo(response.data));
      navigation.navigate('Home');
    })
    .catch((err) => {
      console.error(err);
      alert(err);
      // 에러 종류에 따라 추가적인 로직이 필요:
      // 1. 존재하지 않는 아이디
      // 2. 비밀번호 틀림
      // 3. 통신 오류
      // 각각 alert로 처리할 예정인데 백엔드에서 200 OK밖에 안 정해주셔서 error code api가 확정되어야 구현 가능
    });
};

export const logout = (): AppThunk => (dispatch) => {
  removeToken();
  dispatch(clearInfo());
};

export const modify = (
  profileImg: string,
  password: string,
  nickname: string,
  navigation: NavigationProp<any>
): AppThunk => (dispatch) => {
  userAPI
    .modify(nickname, password, profileImg)
    .then((response) => {
      dispatch(setInfo(response.data));
      navigation.navigate('Profile');
    })
    .catch((err) => {
      console.error(err);
      alert(err);
      // 에러 종류에 따라 추가적인 로직이 필요:
      // 1. 존재하지 않는 아이디
      // 2. 비밀번호 틀림
      // 3. 통신 오류
      // 각각 alert로 처리할 예정인데 백엔드에서 200 OK밖에 안 정해주셔서 error code api가 확정되어야 구현 가능
    });
};
