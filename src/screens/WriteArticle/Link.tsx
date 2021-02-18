import { Label } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import styles from './Link.style';
import { StringInput } from '@/components';

interface LinkProps {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}

function Link({ link, setLink }: LinkProps): JSX.Element {
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
