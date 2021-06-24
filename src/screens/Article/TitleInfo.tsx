import React from 'react';

import { View } from 'native-base';

import { IArticleProps, IArticleStatus } from '@/types/article';

import Info from './Info';
import Title from './Title';
import styles from './TitleInfo.style';

interface ITitleChat {
  article: IArticleProps;
  orderStatus: IArticleStatus;
}
// will change input type
function TitleInfo({ article, orderStatus }: ITitleChat): JSX.Element {
  const titleInfo = { article: article, orderStatus: orderStatus };
  return (
    <View style={styles.bigContainer}>
      <Title {...titleInfo} />
      <Info {...article} />
    </View>
  );
}
export default TitleInfo;
