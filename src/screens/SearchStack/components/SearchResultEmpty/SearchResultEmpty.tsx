import React from 'react';

import { Box, Image, Text, VStack } from 'native-base';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { palette, typo } from '@/styles';

interface ISearchResultEmptyProps {
  searchKeyword: string;
}

const SearchResultEmpty: React.FC<ISearchResultEmptyProps> = ({
  searchKeyword,
}) => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <VStack
      minHeight="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor={palette.whiteGray}
      pb={bottomTabBarHeight}
    >
      <Image
        source={require('@/assets/images/empty.png')}
        alt="no search result"
      />
      <Box width="230px" maxWidth="90%" alignItems="center">
        <Box flexDirection="row" mb="10px">
          <Text color={palette.blue} style={typo.semiTitle} bold>
            {searchKeyword}
          </Text>
          <Text style={typo.semiTitle} bold>
            의 검색 결과가 존재하지 않습니다.
          </Text>
        </Box>
        <Text textAlign="center" style={typo.info} color={palette.gray}>
          다른 검색어를 입력하거나, 보다 더 포괄적인 키워드로 검색해보세요.
        </Text>
      </Box>
    </VStack>
  );
};

export default SearchResultEmpty;
