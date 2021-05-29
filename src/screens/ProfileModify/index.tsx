import React, { useState } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import ModifyButton from '@/assets/ProfileModifyPage/modifyButton.svg';
import ProfileDummyImage from '@/assets/ProfilePage/ProfileDummyImage.svg';
import { StringInput } from '@/components';
import { isValidNickname } from '@/helpers/functions/validate';
import { RootState } from '@/store';

import styles from './ProfileModify.styles';

function ProfileModify(): JSX.Element {
  const [nickname, setNickname] = useState<string>('');
  const [nnTyping, setNNTypinig] = useState<boolean>(false);
  const info = useSelector((state: RootState) => state.user.info);

  const profileImgExist = !!info.userprofile.picture;
  const profileImg = profileImgExist ? (
    <ImageBackground
      source={{ uri: info.userprofile.picture }}
      style={styles.profileImg}
    />
  ) : (
    <ProfileDummyImage width="121" height="121" />
  );

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View style={styles.profileImgWrap}>
          {profileImg}
          <ModifyButton style={styles.imgPickBtn} />
        </View>
      </View>
      <View style={styles.nickContainer}>
        <StringInput
          style={styles.nickInput}
          placeholderStyle={styles.nickInput}
          value={nickname}
          onChangeText={(e) => {
            setNickname(e);
            setNNTypinig(true);
          }}
          placeholder="별명"
        />
        {!isValidNickname(nickname) && nnTyping ? (
          <Text style={styles.nickText}>사용 불가능한 닉네임입니다.</Text>
        ) : null}
      </View>
    </View>
  );
}

export default ProfileModify;
