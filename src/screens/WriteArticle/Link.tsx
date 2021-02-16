import { Label } from 'native-base';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Link.style';
import { StringInput } from '@/components';

interface Props {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}

function Link({ link, setLink }: Props): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <StringInput
        value={link}
        style={styles.text}
        placeholder="구매링크"
        placeholderStyle={styles.placeHolder}
        onChangeText={setLink}
        multiline={true}
      />
    </View>
  );
}
export default Link;
