import { View } from 'native-base';
import React from 'react';
import styles from './TitleInfo.style';
import Title from './Title';
import Info from './Info';
import { IArticleProps } from '@/types/article';

interface ITitleChat {
  article: IArticleProps;
  orderStatus: string;
}
// will change input type
function TitleInfo({ article, orderStatus }: ITitleChat): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <Title {...article} />
      <Info {...article} />
    </View>
  );
}
export default TitleInfo;
