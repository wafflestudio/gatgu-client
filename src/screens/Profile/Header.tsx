import { View, Text, TouchableHighlight } from 'react-native';
import styles from './Header.style';
import React, { useState } from 'react';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';

function Header(): JSX.Element {
  // if option is open
  const [opOpen, setOpOpen] = useState(false);
  const navigation = useNavigation();

  // "뒤로" button onClick
  const goBack = () => {
    console.log('뒤로가기 어케하냐');
  };

  // "..." button onClick
  const toggleOptions = () => {
    setOpOpen(!opOpen);
  };

  const modify = () => {
    navigation.navigate('profileModify');
  };

  const logout = () => {
    alert('not implemented');
  };

  // Header Modal: 수정하기, 로그아웃하기
  const HeaderModal = (
    <View style={styles.modalContainer}>
      <Button title="수정하기" onPress={modify}></Button>
      <Button title="로그아웃하기" onPress={logout}></Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.button} onPress={goBack}>
        <Text style={styles.title}>뒤로</Text>
      </TouchableHighlight>
      <Text style={styles.title}>더 보기</Text>
      <TouchableHighlight style={styles.button} onPress={toggleOptions}>
        <Text style={styles.title}>...</Text>
      </TouchableHighlight>
      {opOpen === true ? HeaderModal : <></>}
    </View>
  );
}

export default Header;
