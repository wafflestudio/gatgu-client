import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { StringInput } from '@/components';

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
      <StringInput
        value={title}
        style={styles.text}
        placeholder="제목"
        placeholderStyle={styles.placeHolder}
        onChangeText={setTitle}
        editable={editable}
        maxLength={40}
      />
    </View>
  );
}

export default Title;
