import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, View } from 'react-native';

import { StringInput } from '@/components';

import styles from '../WriteArticle.style';

interface LocationProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  editable: boolean;
}

function Location({
  location,
  setLocation,
  editable,
}: LocationProps): JSX.Element {
  return (
    <View style={styles.subContainer}>
      <TextInput
        value={location}
        style={[styles.text, { color: editable ? 'black' : 'gray' }]}
        placeholder="거래지역"
        // placeholderStyle={styles.placeHolder}
        onChangeText={setLocation}
        editable={editable}
        maxLength={40}
      />
    </View>
  );
}
export default Location;
