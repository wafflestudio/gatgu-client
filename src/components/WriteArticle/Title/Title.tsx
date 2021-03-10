import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import styles from './Title.style';
import waStyles from '../WriteArticle.style';
import { StringInput } from '@/components';

interface TitleProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}
function Title({ title, setTitle }: TitleProps): JSX.Element {
  return (
    <View style={waStyles.subContainer}>
      <StringInput
        value={title}
        style={styles.text}
        placeholder="제목"
        placeholderStyle={styles.placeHolder}
        onChangeText={setTitle}
      />
    </View>
  );
}

export default Title;
