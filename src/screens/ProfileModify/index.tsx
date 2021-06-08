import React, { useEffect } from 'react';
import { ImageBackground, View, Text, Alert } from 'react-native';
import { useQuery } from 'react-query';

import { getMyData } from '@/apis/UserApi';
import ModifyButton from '@/assets/ProfileModifyPage/modifyButton.svg';
import ProfileDummyImage from '@/assets/ProfilePage/ProfileDummyImage.svg';
import { StringInput } from '@/components';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

import styles from './ProfileModify.styles';

export interface IUserModify {
  nickname: string;
  password: string;
  trading_address: string;
}

interface Props {
  formik: {
    values: IUserModify;
    handleChange: any;
    setFieldValue: any;
    errors: any;
  };
}

const ProfileModify: React.FC<Props> = ({ formik }) => {
  const { values, handleChange, errors, setFieldValue } = formik;
  const userQuery = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  );

  const info = userQuery.data;

  useEffect(() => {
    if (info) {
      setFieldValue('nickname', info.userprofile.nickname);
      setFieldValue('trading_address', info.userprofile.trading_address);
    }
  }, [info]);

  if (userQuery.isLoading || userQuery.isError) return null;
  if (!info) {
    Alert.alert('유저 데이터를 불러오는 데 실패했습니다.');
    return null;
  }

  const profileImgExists = !!info.userprofile.picture;

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View style={styles.profileImgWrap}>
          {profileImgExists ? (
            <ImageBackground
              source={{ uri: info.userprofile.picture }}
              style={styles.profileImg}
            />
          ) : (
            <ProfileDummyImage width="121" height="121" />
          )}
          <ModifyButton style={styles.imgPickBtn} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <StringInput
          style={styles.input}
          placeholderStyle={styles.input}
          value={values.nickname}
          onChangeText={handleChange('nickname')}
          placeholder="별명"
        />
        {errors.nickname && (
          <Text style={styles.text}>사용 불가능한 닉네임입니다.</Text>
        )}
        <StringInput
          style={styles.input}
          placeholderStyle={styles.input}
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder="비밀번호"
        />
        <StringInput
          style={styles.input}
          placeholderStyle={styles.input}
          value={values.trading_address}
          onChangeText={handleChange('trading_address')}
          placeholder="주 거래 지역"
        />
      </View>
    </View>
  );
};

export default ProfileModify;
