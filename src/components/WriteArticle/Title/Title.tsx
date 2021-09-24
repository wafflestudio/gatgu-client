import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, View } from 'react-native';

import waStyles from '../WriteArticle.style';
import styles from './Title.style';

interface TitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  editable: boolean;
}
function Title({ title, setTitle, editable }: TitleProps): JSX.Element {
  return (
    <View style={waStyles.subContainer}>
      <TextInput
        value={title}
        style={styles.text}
        placeholder="제목"
        onChangeText={setTitle}
        editable={editable}
        maxLength={40}
      />
    </View>
  );
}

export default Title;
