import React, { useCallback, useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import _ from 'lodash';

import { ICursorPaginationResponse, TPageType } from '@/types/shared';

interface IUserCursorPaginationOption {
  countPerFetch?: number;
  maxItemCount?: number;
  fetchFunc: (...args: any[]) => Promise<AxiosResponse<unknown>>;
  [key: string]: any;
}

const useCursorPagination = <T>({
  countPerFetch = 20,
  maxItemCount = 500,
  fetchFunc,
  ...input
}: IUserCursorPaginationOption) => {
  const [items, setItems] = useState<T[]>([]);
  const [firstFetching, setFirstFetching] = useState(false);
  const [cursorUrl, setCursorUrl] = useState<{
    next: string | null;
    previous: string | null;
  }>({
    next: null,
    previous: null,
  });
  const [error, setError] = useState<AxiosError<unknown>>();
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [fetching, setFetching] = useState(false);

  const handleItems = useCallback(
    (pageType: TPageType, newItems: T[]) => {
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
    },
    [countPerFetch, maxItemCount]
  );

  const getItems = useCallback(
    async (pageType: TPageType) => {
      if (pageType === 'next' && isLastPage) {
        return;
      }

      const url = pageType !== 'first' ? cursorUrl[pageType] : null;
      setFetching(true);
      setError(undefined);
      if (pageType === 'first') {
        setFirstFetching(true);
      }

      try {
        const res = (await fetchFunc(
          ...Object.values(input),
          url
        )) as AxiosResponse<ICursorPaginationResponse<T>>;

        const { results, next, previous } = res.data;
        handleItems(pageType, results);
        setCursorUrl({ next, previous });

        setIsLastPage(!next);
        setIsFirstPage(!previous);

        return res.data;
      } catch (err) {
        setError(err);
      } finally {
        setFirstFetching(false);
        setFetching(false);
      }
    },
    [cursorUrl, fetchFunc, handleItems, isLastPage]
  );

  return {
    items,
    cursorUrl,
    firstFetching,
    error,
    isFirstPage,
    isLastPage,
    fetching,
    handleItems,
    getItems,
  };
};

export default useCursorPagination;
