import React, { Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Title.style';
import { StringInput } from '@/components';

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}
function Title({ title, setTitle }: Props): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <StringInput
        value={title}
        style={styles.text}
        placeholder="제목"
        placeholderStyle={styles.placeHolder}
        onChangeText={setTitle}
      />
    </View>
  );
}

export default Title;
