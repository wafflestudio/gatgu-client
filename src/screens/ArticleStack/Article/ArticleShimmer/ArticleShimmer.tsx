import React from 'react';
import { ScrollView, View } from 'react-native';

import { Flex, HamburgerIcon, VStack } from 'native-base';
import styled from 'styled-components/native';

import { Header } from '@/components';
import { palette } from '@/styles';
import { IArticleProps } from '@/types/article';

import ArticleHeader from '../ArticleHeader';
import Desc from '../Desc';
import ProductImages from '../ProductImages';
import ProfileChat from '../ProfileChat';
import styles from './ArticleShimmer.style';

const StyledImage = styled.View`
  background-color: ${palette.whiteGray};
  width: 100%;
  height: 283px;
  border-radius: 4px;
`;
const StyledProfile = styled.View`
  borderradius: 50;
  width: 50px;
  height: 50px;
  marginleft: 20px;
  background-color: ${palette.whiteGray};
`;
const SytledWriter = styled.View`
  width: 64px;
  height: 26px;
  marginleft: 13px;
  border-radius: 5px;
  background-color: ${palette.whiteGray};
`;
const StyledChat = styled.View`
  background-color: ${palette.whiteGray};
  width: 150;
  height: 40;
  marginright: 20px;
  border-radius: 15;
`;
const StyledTitle = styled.View`
  background-color: ${palette.whiteGray};
  height: 52px;
  width: auto;
  margintop: 20px;
  border-radius: 4px;
`;
const StyledLocation = styled.View`
  background-color: ${palette.whiteGray};
  width: 200px;
  height: 26px;
  margintop: 8px;
  border-radius: 4px;
`;
const StyledPrice = styled.View`
  background-color: ${palette.whiteGray};
  width: 140px;
  height: 26px;
  margintop: 8px;
`;
const StyledLink = styled.View`
  background-color: ${palette.whiteGray};
  width: auto;
  height: 26px;
  margintop: 20px;
  border-radius: 4px;
`;
const StyledDescription = styled.View`
  background-color: ${palette.whiteGray};
  width: auto;
  height: 130px;
  margintop: 8px;
  border-radius: 4px;
`;

const ArticleShimmer: React.FC = () => {
  return (
    <VStack h="100%" backgroundColor="white">
      <Header right={<HamburgerIcon />} left={<Header.BackButton />} />
      <ScrollView>
        <StyledImage />
        <View style={styles.profile}>
          <View style={styles.profileWrapper}>
            <StyledProfile />
            <SytledWriter />
          </View>
          <StyledChat />
        </View>
        <View style={styles.box}>
          <StyledTitle />
          <StyledLocation />
          <StyledPrice />
        </View>
        <View style={styles.box}>
          <StyledLink />
          <StyledDescription />
        </View>
      </ScrollView>
      {/* <ScrollView>
            <ProductImages
              image_urls={currentArticle.images}
              articleStatus={currentArticle.article_status}
            />
            <ProfileChat
              article={currentArticle}
              orderStatus={currentArticle.article_status}
            />
            <ArticleHeader
              title={currentArticle.title}
              time_in={currentArticle.time_in}
              updated_at={currentArticle?.updated_at}
              article_status={currentArticle.article_status}
              trading_place={currentArticle.trading_place}
              price_min={currentArticle.price_min}
            />
            <Desc
              description={currentArticle.description}
              product_url={currentArticle.product_url}
            />
          </ScrollView> */}
    </VStack>
  );
};
export default ArticleShimmer;
