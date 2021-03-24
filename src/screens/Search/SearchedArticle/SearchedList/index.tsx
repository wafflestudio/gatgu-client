import React from 'react';
import { FlatList } from 'react-native';

import { ArticleBox } from '@/components';
import { IArticleSumProps } from '@/types/article';

const mockData: IArticleSumProps[] = [
  {
    id: 8,
    title: '다이슨 청소기 공구',
    dayLeft: '5일 남음',
    created: '3분 전',
    goal: '2명',
    location: '사운드 마인드',
    percent: 40,
    uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    isMoney: false,
  },
  {
    id: 9,
    title: '다이슨 청소기 공구',
    dayLeft: '5일 남음',
    created: '3분 전',
    goal: '25,000원',
    location: '사운드 마인드',
    percent: 40,
    uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    isMoney: true,
  },
  {
    id: 10,
    title: '다이슨 청소기 공구',
    dayLeft: '5일 남음',
    created: '3분 전',
    goal: '25,000원',
    location: '사운드 마인드',
    percent: 40,
    uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    isMoney: true,
  },
  {
    id: 11,
    title: '다이슨 청소기 공구1',
    dayLeft: '5일 남음',
    created: '3분 전',
    goal: '25,000원',
    location: '사운드 마인드',
    percent: 40,
    uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    isMoney: true,
  },
];

function SearchedList(): JSX.Element {
  const renderArticle = ({ item }: { item: IArticleSumProps }): JSX.Element => (
    <ArticleBox {...item} />
  );

  return (
    <FlatList
      data={mockData}
      renderItem={renderArticle}
      keyExtractor={(_, ind) => String(ind)}
    />
  );
}

export default SearchedList;
