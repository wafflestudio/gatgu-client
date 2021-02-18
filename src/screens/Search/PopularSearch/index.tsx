import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import PopularSearchStyle from './PopularSearch.style';
import SearchStyle from '../Search.style';
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
  const renderedTags = mockData.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        console.log('');
      }}
      style={[SearchStyle.tagBox, PopularSearchStyle.tag]}
      key={tag}
    />
  ));
  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>인기기 검색어</Text>
      <ScrollView horizontal={true}>{renderedTags}</ScrollView>
    </View>
  );
}

export default PopularSearch;
