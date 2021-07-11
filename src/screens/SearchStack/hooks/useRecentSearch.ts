import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { asyncStoragekey } from '@/constants/asyncStorage';
import { ArrayStorage } from '@/helpers/functions/asyncStorage';

const useRecentSearch = () => {
  const [recentSearchKeywords, setRecentSearchKeywords] = useState<string[]>(
    []
  );

  useEffect(() => {
    AsyncStorage.getItem(asyncStoragekey.RECENT_SEARCH)
      .then((res) => {
        if (res !== null) {
          setRecentSearchKeywords(JSON.parse(res));
        }
      })
      .catch(() => {
        Alert.alert('최근 검색 데이터를 불러오지 못했습니다.');
      });
  }, []);

  const addRecentSearchKeyword = useCallback(
    (keyword: string) => {
      if (keyword.length === 0 || recentSearchKeywords[0] === keyword) {
        return;
      }
      const targetIdx = recentSearchKeywords.indexOf(keyword);

      setRecentSearchKeywords((prev) => [
        keyword,
        ...prev.slice(0, targetIdx),
        ...prev.slice(targetIdx + 1),
      ]);
      ArrayStorage.removeElem(asyncStoragekey.RECENT_SEARCH, keyword).then(
        () => {
          ArrayStorage.addElem(asyncStoragekey.RECENT_SEARCH, keyword);
        }
      );
    },
    [recentSearchKeywords]
  );

  const deleteRecentSearchKeyword = useCallback((keyword: string) => {
    setRecentSearchKeywords((prev) => {
      const targetIdx = prev.indexOf(keyword);

      return [...prev.slice(0, targetIdx), ...prev.slice(targetIdx + 1)];
    });
    ArrayStorage.removeElem(asyncStoragekey.RECENT_SEARCH, keyword);
  }, []);

  return {
    recentSearchKeywords,
    addRecentSearchKeyword,
    deleteRecentSearchKeyword,
  };
};

export default useRecentSearch;
