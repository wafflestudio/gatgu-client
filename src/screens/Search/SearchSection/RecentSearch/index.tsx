import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';

import Tag from '@/components/Button';
import { useKeywordDispatch } from '@/helpers/hooks';
import * as asyncStorageFunc from '@/helpers/functions/asyncStorage';
import { asyncStoragekey } from '@/constants/asyncStorage';
import { removeKeyword } from '@/store/searchSlice';

import styles from './RecentSearch.style';
import SearchStyle from '../../Search.style';

interface IRecentSearchProps {
  tags: string[];
}

function RecentSearch({ tags }: IRecentSearchProps): JSX.Element {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const keywordDispatch = useKeywordDispatch();

  // x 누르면 asyncstorage와 recentSearchStorage 갱신
  const onPressXIcon = useCallback((tag: string) => {
    asyncStorageFunc.removePropArrElem(asyncStoragekey.RECENT_SEARCH, tag);
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
