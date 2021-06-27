import React, { useEffect, useLayoutEffect } from 'react';
import { ImageBackground, View, Text, Alert } from 'react-native';
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { useFormik } from 'formik';
import isEmpty from 'lodash/isEmpty';

import { useNavigation } from '@react-navigation/native';

import { getMyData, modifyMyInfo } from '@/apis/UserApi';
import ProfileDummyImage from '@/assets/ProfilePage/ProfileDummyImage.svg';
import ModifyButton from '@/assets/icons/ModifyButton/modifyButton.svg';
import { Button, StringInput } from '@/components';
import { isValidNickname } from '@/helpers/functions/validate';
import { USER_DETAIL } from '@/queryKeys';
import { AppLoading } from '@/screens';
import { IUserDetail } from '@/types/user';

import styles from './ProfileModify.styles';

export interface IUserModify {
  nickname: string;
  password: string;
  trading_address: string;
}

const ProfileModify: React.FC = () => {
  const {
    values,
    handleChange,
    errors,
    setFieldValue,
    handleSubmit,
  } = useFormik<IUserModify>({
    initialValues: {
      nickname: '',
      password: '',
      trading_address: '',
    },
    validate: (values: IUserModify) => {
      const errors = {};
      // nickname
      const nickname =
        values.nickname &&
        !isValidNickname(values.nickname) &&
        '필수정보입니다.';
      if (nickname) Object.assign(errors, { nickname });

      return errors;
    },
    onSubmit: async (values) => {
      if (!isEmpty(errors)) {
        Alert.alert('올바른 정보를 입력해 주세요.');
        return;
      }

      await modifyUserProfileMutation.mutateAsync(values);
      navigation.navigate('Profile');
      await queryClient.invalidateQueries(USER_DETAIL);
    },
  });

  const userQuery = useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  );

  const navigation = useNavigation();
  const info = userQuery.data;

  useEffect(() => {
    if (info) {
      setFieldValue('nickname', info.userprofile.nickname);
      setFieldValue('trading_address', info.userprofile.trading_address);
    }
  }, [info, setFieldValue]);

  const isMutating = useIsMutating();

  const modifyUserProfileMutation = useMutation((values: IUserModify) => {
    return modifyMyInfo(values);
  });

  const queryClient = useQueryClient();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      // eslint-disable-next-line react/display-name
      headerRight: () => <Button title="완료" onPress={handleSubmit} />,
    });
  }, [handleSubmit, navigation]);

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
        <Text>{!!isMutating && '수정사항을 반영중입니다.'}</Text>
      </View>
    </View>
  );
};

export default ProfileModify;
