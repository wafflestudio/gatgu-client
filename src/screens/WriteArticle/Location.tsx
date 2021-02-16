import { Label } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Location.style';
import { StringInput } from '@/components';

interface Props {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Location({ location, setLocation }: Props): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <StringInput
        value={location}
        style={styles.text}
        placeholder="거래지역"
        placeholderStyle={styles.placeHolder}
        onChangeText={setLocation}
      />
    </View>
  );
}
export default Location;
