import React from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import Tag from '@/components/Button/Button';
import { GetArticleSumStatus, SearchType } from '@/constants/article';
import tagList from '@/constants/tagList';
import { useKeywordDispatch } from '@/helpers/hooks';
import { searchArticles } from '@/store/searchSlice/searchSlice';

import SearchStyle from '../../Search.style';
import styles from './TagList.style';

function TagList(): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const keywordDispatch = useKeywordDispatch();
  const renderedTags = tagList.map((tag) => (
    <Tag
      title={tag}
      onPress={() => {
        keywordDispatch(tag);
        navigation.navigate('SearchedArticle');
        dispatch(
          searchArticles(GetArticleSumStatus.FIRST, tag, SearchType.TAG)
        );
      }}
      style={SearchStyle.tagBox}
      key={tag}
    />
  ));
  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>태그로 검색</Text>
      <View style={styles.tagsWrapper}>{renderedTags}</View>
    </View>
  );
}

export default TagList;
