import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import PopularSearchStyle from './PopularSearch.style';
import SearchStyle from '../../Search.style';
import Tag from '@/components/Button';

const mockData = [
  '검색어1',
  '검색어2',
  '검색어3',
  '검색어4',
  '검색어5',
  '검색어6',
  '검색어7',
];

function PopularSearch(): JSX.Element {
  const renderedTags = mockData.map((_,ind) => (
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
