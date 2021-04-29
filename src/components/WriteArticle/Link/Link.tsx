import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { StringInput } from '@/components';

import styles from '../WriteArticle.style';

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
