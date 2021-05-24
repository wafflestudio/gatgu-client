import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { StringInput } from '@/components';

import waStyles from '../WriteArticle.style';
import styles from './Description.style';

interface DescriptionProps {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

function Description({
  description,
  setDescription,
}: DescriptionProps): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <StringInput
        value={description}
        style={waStyles.text}
        placeholder="내용"
        placeholderStyle={styles.placeHolder}
        onChangeText={setDescription}
        multiline={true}
      />
    </View>
  );
}
export default Description;
