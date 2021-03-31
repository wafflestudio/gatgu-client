import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import ArticleListTemplate from '@/components/ArticleListTemplate';
import { createError } from '@/helpers/functions';
import { RootState } from '@/store';
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
