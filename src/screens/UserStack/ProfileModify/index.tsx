import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useIsMutating, useMutation, useQueryClient } from 'react-query';

import { useFormik } from 'formik';
import isEmpty from 'lodash/isEmpty';

import { useNavigation } from '@react-navigation/native';

import { modifyMyInfo } from '@/apis/UserApi';
import ModifyButton from '@/assets/icons/ModifyButton/modifyButton.svg';
import ProfileDummyImage from '@/assets/icons/ProfileDummyImage/ProfileDummyImage.svg';
import { StringInput } from '@/components';
import { GButton } from '@/components/Gatgu';
import { emptyURL } from '@/constants/image';
import { APItype } from '@/enums/image';
import { isValidNickname } from '@/helpers/functions/validate';
import { useToaster } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import usePickImage from '@/helpers/hooks/usePickImage';
import { USER_DETAIL } from '@/queryKeys';
import { TShortImage } from '@/types/shared';

import styles from './ProfileModify.styles';

export interface IUserModify {
  nickname: string;
  password: string;
  trading_address: string;
  picture: string;
}

const ProfileModify: React.FC = () => {
  const toaster = useToaster();
  const { uploadSingleImage } = useImageUpload(APItype.user);
  const [img, setImg] = useState<TShortImage>({ mime: 'jpeg', path: emptyURL });
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
      picture: '',
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
        toaster.info('올바른 정보를 입력해 주세요.');
        return;
      }
      if (img.path !== emptyURL) {
        const tempUrl = await uploadSingleImage(img);
        values.picture = tempUrl;
      }
      await modifyUserProfileMutation.mutateAsync(values);
      navigation.navigate('Profile');
      await queryClient.invalidateQueries(USER_DETAIL);
    },
  });

  const userQuery = useUserDetail();
  const { pickSingleImage } = usePickImage();

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
      headerRight: () => (
        <GButton size="small" onPress={() => handleSubmit()}>
          완료
        </GButton>
      ),
    });
  }, [handleSubmit, navigation]);

  if (userQuery.isLoading || userQuery.isError) return null;
  if (!info) {
    toaster.error(
      '유저 데이터를 불러오는 데 실패했습니다. 네트워크 연결을 확인해주세요'
    );
    return null;
  }
  const handlePress = () => {
    pickSingleImage()
      .then((img) => {
        setImg({
          mime: img.mime,
          path: img.path,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const profileImgExists = !!info.userprofile.picture || img?.path !== emptyURL;

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View style={styles.profileImgWrap}>
          <View style={{ borderRadius: 22 }}>
            {profileImgExists ? (
              <Image
                source={{
                  uri:
                    img?.path === emptyURL
                      ? info.userprofile.picture
                      : img.path,
                }}
                style={styles.profileImg}
              />
            ) : (
              <View>
                <ProfileDummyImage width="121" height="121" />
              </View>
            )}
          </View>
          <View style={styles.imgCont}>
            <TouchableOpacity onPress={handlePress}>
              <ModifyButton style={styles.imgPickBtn} />
            </TouchableOpacity>
          </View>
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
        {/* <StringInput
          style={styles.input}
          placeholderStyle={styles.input}
          value={values.password}
          onChangeText={handleChange('password')}
          placeholder="비밀번호"
        /> */}
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
