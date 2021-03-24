import { Alert } from 'react-native';

import { AxiosError } from 'axios';

import { NavigationProp } from '@react-navigation/native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userAPI } from '@/apis';
import { setToken, removeToken } from '@/apis/BaseInstance';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { AppThunk } from '@/store';
import { IUserProps } from '@/types/user';

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
      updated_at: null,
      withdrew_at: null,
    },
    is_active: false,
    participated_count: 0,
    hosted_count: 0,
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
    },
    clearInfo(state) {
      state.info = { ...initialState.info };
      state.logged = false;
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
      ObjectStorage.addObject(asyncStoragekey.USER, response.data);
      dispatch(setInfo(response.data));
      navigation.navigate('Home');
    })
    .catch((err: AxiosError) => {
      switch (parseInt(err.code + '')) {
        case 403:
          Alert.alert(err.message);
          break;
        default:
          Alert.alert('unknown error');
      }
    });
};

export const logout = (): AppThunk => (dispatch) => {
  removeToken();
  ObjectStorage.removeObject(asyncStoragekey.USER);
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
    .catch((err: AxiosError) => {
      switch (parseInt(err.code + '')) {
        case 400:
          Alert.alert(err.message);
          break;
        default:
          Alert.alert('unknown error');
      }
    });
};
