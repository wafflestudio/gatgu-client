import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PopularSearchStyle from './PopularSearch.style';
import SearchStyle from '../../Search.style';
import Tag from '@/components/Button';
import { useKeywordDispatch } from '@/helpers/hooks';

interface IPopularSearchProps {
  tags: string[];
}

function PopularSearch({ tags }: IPopularSearchProps): JSX.Element {
  const navigation = useNavigation();
  const keywordDispatch = useKeywordDispatch();
  const renderedTags = tags.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        keywordDispatch(tag);
        navigation.navigate('SearchedArticle');
      }}
      style={[SearchStyle.tagBox, PopularSearchStyle.tag]}
      textStyle={SearchStyle.tagText}
      key={tag}
    />
  ));

  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>인기 검색어</Text>
      <View style={PopularSearchStyle.tagWrapper}>{renderedTags}</View>
    </View>
  );
}

export default PopularSearch;
