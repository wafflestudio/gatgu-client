import React, { useCallback } from 'react';
import { ImageBackground, View, Text, Alert } from 'react-native';
import { useQuery } from 'react-query';

import { Formik } from 'formik';

import { getMyData } from '@/apis/UserApi';
import ModifyButton from '@/assets/ProfileModifyPage/modifyButton.svg';
import ProfileDummyImage from '@/assets/ProfilePage/ProfileDummyImage.svg';
import { StringInput } from '@/components';
import { isValidNickname } from '@/helpers/functions/validate';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

import styles from './ProfileModify.styles';

interface IUserModify {
  nickname: string;
}

const formikInitialValues: IUserModify = {
  nickname: '',
};

const ProfileModify: React.FC = () => {
  const userQuery = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  );

  const modifyUserProfile = useCallback((values: IUserModify) => {
    // TODO @woohm402
    //  api 말씀드려뒀음 https://wafflestudio.slack.com/archives/C01LD8Q0Q72/p1622395205174200
    console.log(values);
  }, []);

  const validate = (values: IUserModify) => {
    const errors = {};
    // nickname
    const nickname =
      values.nickname && !isValidNickname(values.nickname) && '필수정보입니다.';
    if (nickname) Object.assign(errors, { nickname });

    return errors;
  };

  if (userQuery.isLoading || userQuery.isError) return null;
  const info = userQuery.data;
  if (!info) {
    Alert.alert('유저 데이터를 불러오는 데 실패했습니다.');
    return null;
  }

  const profileImgExists = !!info.userprofile.picture;

  return (
    <Formik<IUserModify>
      initialValues={formikInitialValues}
      onSubmit={modifyUserProfile}
      validate={validate}
    >
      {({ values, handleChange, errors }) => (
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
      )}
    </Formik>
  );
};

export default ProfileModify;
