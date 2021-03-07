import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Tag from '@/components/Button';
import tagList from '@/constants/tagList';
import { useKeywordDispatch } from '@/helpers/hooks';

import TagListStyle from './TagList.style';
import SearchStyle from '../../Search.style';

function TagList(): JSX.Element {
  const navigation = useNavigation();
  const keywordDispatch = useKeywordDispatch();
  const renderedTags = tagList.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        keywordDispatch(tag);
        navigation.navigate('SearchedArticle');
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
