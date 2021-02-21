import React from 'react';
import { View, Text } from 'react-native';

import Tag from '@/components/Button';
import TagListStyle from './TagList.style';
import SearchStyle from '../../Search.style';
import tagList from '@/constants/tagList';

function TagList(): JSX.Element {
  const renderedTags = tagList.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        // TODO:
        console.log('Todo');
      }}
      style={SearchStyle.tagBox}
      key={tag}
    />
  ));
  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>태그로 검색</Text>
      <View style={TagListStyle.tagsWrapper}>{renderedTags}</View>
    </View>
  );
}

export default TagList;
