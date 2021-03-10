import React from 'react';
import { WriteArticle } from '@/components';

const TagArray = [
  { id: 1, tag: '운동', selected: false },
  { id: 2, tag: '음식', selected: false },
  { id: 3, tag: '가구', selected: false },
  { id: 4, tag: '컴공', selected: false },
  { id: 5, tag: '기계', selected: false },
  { id: 6, tag: '전기', selected: false },
  { id: 7, tag: '방탄', selected: false },
  { id: 8, tag: '엑소', selected: false },
  { id: 9, tag: '빅뱅', selected: false },
];

function WriteArticleTemplate(): JSX.Element {
  return <WriteArticle />;
}

export default WriteArticleTemplate;
