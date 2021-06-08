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
    if (info) setFieldValue('nickname', info.userprofile.nickname);
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
      <View style={styles.nickContainer}>
        <StringInput
          style={styles.nickInput}
          placeholderStyle={styles.nickInput}
          value={values.nickname}
          onChangeText={handleChange('nickname')}
          placeholder="별명"
        />
        {errors.nickname && (
          <Text style={styles.nickText}>사용 불가능한 닉네임입니다.</Text>
        )}
      </View>
    </View>
  );
};

export default ProfileModify;
