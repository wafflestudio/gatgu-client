import { useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

import { ICursorPaginationResponse, TPageType } from '@/types/shared';

interface IUserCursorPaginationOption {
  countPerFetch?: number;
  maxItemCount?: number;
  fetchFunc: (url?: string) => Promise<AxiosResponse<unknown>>;
}

const useCursorPagination = <T>({
  countPerFetch = 20,
  maxItemCount = 500,
  fetchFunc,
}: IUserCursorPaginationOption) => {
  const [items, setItems] = useState<T[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cursorUrl, setCursorUrl] = useState<{
    next?: string;
    previous?: string;
  }>({});
  const [error, setError] = useState<AxiosError<unknown>>();
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const getItems = async (pageType: TPageType) => {
    const url = pageType != 'first' ? cursorUrl[pageType] : undefined;

    if (pageType === 'first') {
      setRefreshing(true);
    }

    try {
      const res = (await fetchFunc(url)) as AxiosResponse<
        ICursorPaginationResponse<T>
      >;

      const { results, next, previous } = res.data;
      handleItems(pageType, results);
      setCursorUrl({ next, previous });

      setIsLastPage(Boolean(next));
      setIsFirstPage(Boolean(previous));

      return res.data;
    } catch (err) {
      setError(err);
    }

    setRefreshing(false);
  };

  const handleItems = (pageType: TPageType, newItems: T[]) => {
    switch (pageType) {
      case 'first':
        setItems(newItems);
        break;

      case 'next':
        setItems((prev) => {
          if (prev.length < maxItemCount - countPerFetch) {
            return [...prev, ...newItems];
          }

          const deepClonedPrevItem = _.cloneDeep(prev);

          return [
            ...deepClonedPrevItem.slice(
              countPerFetch,
              deepClonedPrevItem.length
            ),
            ...newItems,
          ];
        });
        break;

      case 'previous':
        setItems((prev) => {
          const deepClonedPrevItem = _.cloneDeep(prev);

          return [
            ...newItems,
            ...deepClonedPrevItem.splice(0, maxItemCount - countPerFetch),
          ];
        });
        break;

      // no default case
    }
  };

  return {
    items,
    cursorUrl,
    refreshing,
    error,
    isFirstPage,
    isLastPage,
    handleItems,
    getItems,
  };
};

export default useCursorPagination;