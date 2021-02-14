import { Label } from 'native-base';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Description.style';

interface Props {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

function Description({ description, setDescription }: Props): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <Label style={styles.label}>내용: </Label>
      <TextInput
        style={styles.text}
        placeholder="내용"
        onChangeText={setDescription}
        value={description}
      />
    </View>
  );
}
export default Description;
