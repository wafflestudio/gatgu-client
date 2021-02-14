import { View } from 'native-base';
import React from 'react';
import styles from './TitleInfo.style';
import Title from './Title';
import Info from './Info';

// will change input type
function TitleInfo({ dummyArticle }: any): JSX.Element {
  return (
    <View style={styles.bigContainer}>
      <Title dummyArticle={dummyArticle} />
      <Info dummyArticle={dummyArticle} />
    </View>
  );
}
export default TitleInfo;
