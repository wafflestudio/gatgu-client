import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  Alert,
  Button,
  Modal,
} from 'react-native';

import { AxiosError } from 'axios';

import { useNavigation } from '@react-navigation/core';

import ModifyButton from '@/assets/ProfileModifyPage/modifyButton.svg';
import ProfileDummyImage from '@/assets/ProfilePage/ProfileDummyImage.svg';
import { StringInput } from '@/components';
import Header from '@/components/Header';
import { validateNN } from '@/helpers/functions/validate';

import styles from './ProfileModify.styles';

interface ModifyErrorState {
  profileImgUrl: AxiosError | null;
  nickname: AxiosError | null;
}

function ProfileModify(): JSX.Element {
  const navigation = useNavigation();

  const [nickname, setNickname] = useState('');
  const [profileImgUrl, setProfileImgUrl] = useState('');
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [modifyError, setModifyError] = useState<ModifyErrorState>({
    profileImgUrl: null,
    nickname: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // check profile changed
  useEffect(() => {
    if (nickname !== '기존 값' || profileImgUrl !== '기존 값') {
      setIsProfileChanged(true);
    }

    setIsProfileChanged(false);
  }, [nickname, profileImgUrl]);

  const handleSubmit = () => {
    Alert.alert('변경!');
  };

  const handleNavigationGoBack = () => {
    if (isProfileChanged) {
      setIsModalOpen(true);
    } else {
      navigation.goBack();
    }
  };

  const renderNicknameErrorMessage = () => {
    if (!isProfileChanged) {
      return null;
    }

    if (!validateNN(nickname)) {
      return (
        <Text style={styles.nickText}>닉네임은 두글자 이상이어야 합니다.</Text>
      );
    }

    if (modifyError.nickname) {
      return <Text style={styles.nickText}>해당 닉네임이 존재합니다.</Text>;
    }

    return null;
  };

  return (
    <>
      <View style={styles.container}>
        <Header
          title="프로필 수정"
          left={<Text>뒤로가기</Text>}
          leftCallback={handleNavigationGoBack}
          right={
            <Button
              title="변경"
              disabled={isProfileChanged}
              onPress={handleSubmit}
            />
          }
          titleShown
        />
        <View style={styles.imgContainer}>
          <View style={styles.profileImgWrap}>
            {profileImgUrl.length ? (
              <ImageBackground
                source={{ uri: profileImgUrl }}
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
            value={nickname}
            onChangeText={setNickname}
            placeholder="새로운 닉네임을 입력해주세요"
          />
          {renderNicknameErrorMessage()}
        </View>
      </View>
      {isModalOpen && (
        <Modal>
          수정된 정보가 있습니다. 뒤로 가시겠습니까?
          <Button title="네" onPress={navigation.goBack} />
          <Button title="취소" onPress={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}

export default ProfileModify;
