import { Alert } from 'react-native';

import axios, { AxiosError } from 'axios';

import { NavigationProp } from '@react-navigation/native';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { userAPI } from '@/apis';
import { setToken, removeToken } from '@/apis/BaseInstance';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ObjectStorage } from '@/helpers/functions/asyncStorage';
import { AppThunk } from '@/store';
import { IUserProps } from '@/types/user';
import { err } from 'react-native-svg/lib/typescript/xml';
import get from 'lodash/get';

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
    .catch((error: AxiosError) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            Alert.alert(get(error, ['response', 'data', 'error']));
            break;
          case 403:
            Alert.alert(get(error, ['response', 'data', 'detail']));
            break;
          default:
            // 예상치 못한 에러 코드
            Alert.alert(
              '예상치 못한 에러가 발생했습니다. 고객센터로 문의해주시기 바랍니다.'
            );
        }
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
