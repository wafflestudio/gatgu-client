import React from 'react';
import { View } from 'react-native';

import { Flex } from 'native-base';
import styled from 'styled-components/native';

import { palette } from '@/styles';

import styles from './ArticleBox.style';

const StyledImageShimmer = styled.View`
  background-color: ${palette.whiteGray};
  width: 90px;
  height: 90px;
  border-radius: 13px;
`;

const StyledTitle = styled.View`
  background-color: ${palette.whiteGray};
  width: 100%;
  height: 26px;
`;

const StyledInfo = styled.View`
  background-color: ${palette.whiteGray};
  width: 156px;
  height: 15px;
`;

const StyledPrice = styled.View`
  background-color: ${palette.whiteGray};
  width: 122px;
  height: 12px;
`;

const ArticleBoxShimmer: React.FC = () => {
  return (
    <View style={styles.postBox}>
      <StyledImageShimmer />
      <View style={styles.articleBox}>
        <Flex>
          <StyledTitle />
          <View style={styles.infoWrapper}>
            <StyledInfo />
          </View>
        </Flex>
        <Flex direction="row" justify="flex-end">
          <StyledPrice />
        </Flex>
      </View>
    </View>
  );
};

export default ArticleBoxShimmer;
