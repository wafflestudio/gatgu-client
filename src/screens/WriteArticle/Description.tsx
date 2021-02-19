import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import styles from './Description.style';
import waStyles from './WriteArticle.style';
import { StringInput } from '@/components';

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
