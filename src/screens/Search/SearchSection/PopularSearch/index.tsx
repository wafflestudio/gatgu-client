import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import PopularSearchStyle from './PopularSearch.style';
import SearchStyle from '../../Search.style';
import Tag from '@/components/Button';

interface IPopularSearchProps {
  tags: string[];
}

function PopularSearch({ tags }: IPopularSearchProps): JSX.Element {
  const renderedTags = tags.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        console.log('');
      }}
      style={[SearchStyle.tagBox, PopularSearchStyle.tag]}
      textStyle={SearchStyle.tagText}
      key={ind}
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
