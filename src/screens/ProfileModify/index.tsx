import { useState } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import styles from './ProfileModify.styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { StringInput } from '@/components';

function ProfileModify(): JSX.Element {
  const [nickname, setNickname] = useState('');
  const { info } = useSelector((state: RootState) => state.user);
  const profileImg = { uri: info.userprofile.picture };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <View style={styles.profileImgWrap}>
          <ImageBackground source={profileImg} style={styles.profileImg} />
          <View style={styles.imgPickBtn}></View>
        </View>
      </View>
      <View style={styles.nickContainer}>
        <StringInput
          style={styles.nickInput}
          placeholderStyle={styles.nickInput}
          value={nickname}
          onChangeText={setNickname}
          placeholder="별명"
        />
      </View>
      <Text>
        아마도 디자인이 아직 덜 나온 스크린인 듯 하다 대체 완료 버튼은 어디에
        있는 것인가
      </Text>
    </View>
  );
}

export default ProfileModify;
