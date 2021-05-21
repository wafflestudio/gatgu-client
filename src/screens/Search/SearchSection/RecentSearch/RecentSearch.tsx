import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import Tag from '@/components/Button/Button';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { ArrayStorage } from '@/helpers/functions/asyncStorage';
import { useKeywordDispatch } from '@/helpers/hooks';
import { removeKeyword } from '@/store/searchSlice/searchSlice';

import SearchStyle from '../../Search.style';
import styles from './RecentSearch.style';

interface IRecentSearchProps {
  tags: string[];
}

function RecentSearch({ tags }: IRecentSearchProps): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const keywordDispatch = useKeywordDispatch();

  // x 누르면 asyncstorage와 recentSearchStorage 갱신
  const onPressXIcon = useCallback((tag: string) => {
    ArrayStorage.removeElem(asyncStoragekey.RECENT_SEARCH, tag);
    dispatch(removeKeyword({ keyword: tag }));
  }, []);

  const renderedTags = tags.map((tag, ind) => (
    <View key={ind} style={[SearchStyle.tagBox, styles.tagsWrapper]}>
      <Tag
        title={tag}
        onPress={() => {
          keywordDispatch(tag);
          navigation.navigate('SearchedArticle');
        }}
      />
      <TouchableOpacity
        onPress={() => {
          onPressXIcon(tag);
        }}
      >
        <Icon name="close" style={styles.Icon} />
      </TouchableOpacity>
    </View>
  ));
  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>최근 검색어</Text>
      <ScrollView horizontal={true}>{renderedTags}</ScrollView>
    </View>
  );
}

export default RecentSearch;
