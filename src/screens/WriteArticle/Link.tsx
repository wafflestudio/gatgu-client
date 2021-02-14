import { Label } from 'native-base';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Link.style';

interface Props {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}

function Link({ link, setLink }: Props): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <Label style={styles.label}>구매처 링크: </Label>
      <TextInput
        style={styles.text}
        placeholder="구매링크"
        onChangeText={setLink}
        value={link}
      />
    </View>
  );
}
export default Link;
