import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Tag from '@/components/Button';
import SearchStyle from '../../Search.style';

interface IRecentSearchProps {
  tags: string[];
}

function RecentSearch({ tags }: IRecentSearchProps): JSX.Element {
  const renderedTags = tags.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        console.log('');
      }}
      style={SearchStyle.tagBox}
      key={tag}
    />
  ));
  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>최근 검색어</Text>
      <ScrollView horizontal={true}>{renderedTags}</ScrollView>
    </View>
  );
}

export default RecentSearch;
