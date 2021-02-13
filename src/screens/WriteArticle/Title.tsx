import { Label } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Title.style';

interface Props {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}
function Title({ title, setTitle }: Props): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <Label style={styles.label}>제목: </Label>
      <TextInput
        style={styles.text}
        placeholder="제목"
        onChangeText={setTitle}
        value={title}
      />
    </View>
  );
}

export default Title;
