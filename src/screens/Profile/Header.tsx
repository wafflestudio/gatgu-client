import { View, Text, TouchableHighlight } from 'react-native';
import styles from './Profile.Style';
import React, { useState } from 'react';
import { Button } from '@/components';

function Header(): JSX.Element {
  // if option is open
  const [opOpen, setOpOpen] = useState(false);

  // "뒤로" button onClick
  const goBack = () => {
    console.log('뒤로가기 어케하냐');
  };

  // "..." button onClick
  const toggleOptions = () => {
    setOpOpen(!opOpen);
  };

  const modify = () => {
    alert('not implemented');
  };

  const logout = () => {
    alert('not implemented');
  };

  // Header Modal: 수정하기, 로그아웃하기
  const HeaderModal = (
    <View style={styles.header.modalContainer}>
      <Button title="수정하기" onPress={modify}></Button>
      <Button title="로그아웃하기" onPress={logout}></Button>
    </View>
  );

  return (
    <View style={styles.header.container}>
      <TouchableHighlight style={styles.header.button} onPress={goBack}>
        <Text style={styles.header.title}>뒤로</Text>
      </TouchableHighlight>
      <Text style={styles.header.title}>더 보기</Text>
      <TouchableHighlight style={styles.header.button} onPress={toggleOptions}>
        <Text style={styles.header.title}>...</Text>
      </TouchableHighlight>
      {opOpen === true ? HeaderModal : <></>}
    </View>
  );
}

export default Header;
