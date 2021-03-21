import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Tag from '@/components/Button';
import { useKeywordDispatch } from '@/helpers/hooks';

import styles from './PopularSearch.style';
import SearchStyle from '../../Search.style';

interface IPopularSearchProps {
  tags: string[];
}

function PopularSearch({ tags }: IPopularSearchProps): JSX.Element {
  const navigation = useNavigation();
  const keywordDispatch = useKeywordDispatch();
  const renderedTags = tags.map((tag, ind) => (
    <Tag
      title={tag}
      onPress={() => {
        keywordDispatch(tag);
        navigation.navigate('SearchedArticle');
      }}
      style={[SearchStyle.tagBox, styles.tag]}
      textStyle={SearchStyle.tagText}
      key={ind}
    />
  ));

  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>인기 검색어</Text>
      <View style={styles.tagWrapper}>{renderedTags}</View>
    </View>
  );
}

export default PopularSearch;
