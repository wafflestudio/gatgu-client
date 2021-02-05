import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Icon } from 'native-base';

import styles from './style';

export default function SearchBar() {
  const [input, setInput] = useState('');

  const onSubmit = () => {
    alert(`${input}을 검색하겠다!`);
  };

  return (
    <View style={styles.outerBox}>
      <Icon name="ios-search" style={{ paddingLeft: 10 }} />
      <Input
        value={input}
        onChangeText={setInput}
        onSubmitEditing={onSubmit}
        placeholder={'검색하세요'}
      />
    </View>
  );
}
