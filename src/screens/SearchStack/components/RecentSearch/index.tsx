import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { CloseIcon, IconButton } from 'native-base';

import SearchStyle from '../../Search.style';
import styles from './RecentSearch.style';

interface IRecentSearchProps {
  keywords: string[];
  onKeywordDelete: (keyword: string) => void;
  onKeywordPress: (keyword: string) => void;
}

function RecentSearch({
  keywords,
  onKeywordDelete,
  onKeywordPress,
}: IRecentSearchProps): JSX.Element {
  const renderedTags = keywords.map((keyword, ind) => (
    <TouchableOpacity
      key={ind}
      style={[SearchStyle.tagBox, styles.tagsWrapper]}
      onPress={() => onKeywordPress(keyword)}
    >
      <Text>{keyword}</Text>
      <IconButton
        icon={<CloseIcon size="10px" />}
        pl="3px"
        onPress={() => {
          onKeywordDelete(keyword);
        }}
      />
    </TouchableOpacity>
  ));

  return (
    <View style={SearchStyle.sectionWrapper}>
      <Text style={SearchStyle.head}>최근 검색어</Text>
      <ScrollView horizontal={true}>{renderedTags}</ScrollView>
    </View>
  );
}

export default RecentSearch;
