import { View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import styles from './Desc.style';

// TODO: Fix input type after correcting Article Interface in types folder
function Desc({ dummyArticle }: any): JSX.Element {
  return (
    <View>
      <Text style={styles.descText}>{dummyArticle.description}</Text>
    </View>
  );
}
export default Desc;
