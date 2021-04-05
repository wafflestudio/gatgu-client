import React from 'react';

import { ArticleBox } from '@/components';
import { IArticleSumProps } from '@/types/article';

import { useSelector, shallowEqual } from 'react-redux';

import { RootState } from '@/store';
import { createError } from '@/helpers/functions';
import ArticleListTemplate from '@/components/ArticleListTemplate';
import { searchArticles } from '@/store/searchSlice';
const [Error] = createError();

function SearchedList(): JSX.Element {
  const searchProps = useSelector(
    (state: RootState) => state.search,
    shallowEqual
  );
  return (
    <ArticleListTemplate
      {...searchProps}
      Error={Error}
      getArticles={searchArticles}
    />
  );
}

export default SearchedList;
