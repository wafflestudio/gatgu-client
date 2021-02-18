import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import styles from './Location.style';
import { StringInput } from '@/components';

interface LocationProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Location({ location, setLocation }: LocationProps): JSX.Element {
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
