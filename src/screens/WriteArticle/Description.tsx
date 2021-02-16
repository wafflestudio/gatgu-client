import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import styles from './Description.style';
import { StringInput } from '@/components';

interface Props {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

function Description({ description, setDescription }: Props): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <StringInput
        value={description}
        style={styles.text}
        placeholder="내용"
        placeholderStyle={styles.placeHolder}
        onChangeText={setDescription}
        multiline={true}
      />
    </View>
  );
}
export default Description;
