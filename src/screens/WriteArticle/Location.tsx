import { Label } from 'native-base';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Location.style';

interface Props {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Location({ location, setLocation }: Props): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <Label style={styles.label}>위치: </Label>
      <TextInput
        style={styles.text}
        placeholder="상세주소"
        onChangeText={setLocation}
        value={location}
      />
    </View>
  );
}
export default Location;
