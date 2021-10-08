import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, View } from 'react-native';

import waStyles from '../WriteArticle.style';
import styles from './Description.style';

interface DescriptionProps {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  editable: boolean;
}

function Description({
  description,
  setDescription,
  editable,
}: DescriptionProps): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <TextInput
        value={description}
        style={waStyles.text}
        placeholder="내용"
        onChangeText={setDescription}
        multiline={true}
        editable={editable}
      />
    </View>
  );
}
export default Description;
