import React from 'react';
import { ScrollView, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import { VStack } from 'native-base';
import styled from 'styled-components/native';

import { Header } from '@/components';
import { useSelector } from '@/helpers/hooks';
import { palette } from '@/styles';

import styles from './ArticleShimmer.style';

const StyledImage = styled.View`
  background-color: ${palette.whiteGray};
  width: 100%;
  height: 283px;
  border-radius: 4px;
`;
const StyledProfile = styled.View`
  border-radius: 50;
  width: 50px;
  height: 50px;
  margin-left: 20px;
  background-color: ${palette.whiteGray};
`;
const SytledWriter = styled.View`
  width: 64px;
  height: 26px;
  margin-left: 13px;
  border-radius: 5px;
  background-color: ${palette.whiteGray};
`;
const StyledChat = styled.View`
  background-color: ${palette.whiteGray};
  width: 150;
  height: 40;
  margin-right: 20px;
  border-radius: 15;
`;
const StyledTitle = styled.View`
  background-color: ${palette.whiteGray};
  height: 52px;
  width: auto;
  margin-top: 20px;
  border-radius: 4px;
`;
const StyledLocation = styled.View`
  background-color: ${palette.whiteGray};
  width: 200px;
  height: 26px;
  margin-top: 8px;
  border-radius: 4px;
`;
const StyledPrice = styled.View`
  background-color: ${palette.whiteGray};
  width: 140px;
  height: 26px;
  margin-top: 8px;
`;
const StyledLink = styled.View`
  background-color: ${palette.whiteGray};
  width: auto;
  height: 26px;
  margin-top: 20px;
  border-radius: 4px;
`;
const StyledDescription = styled.View`
  background-color: ${palette.whiteGray};
  width: auto;
  height: 130px;
  margin-top: 8px;
  border-radius: 4px;
`;

const ArticleShimmer: React.FC = () => {
  const isLogined = useSelector((state) => state.user.isLogined);

  return (
    <VStack h="100%" backgroundColor="white">
      <Header
        right={isLogined ? <Octicons name="three-bars" size={28} /> : null}
        left={<Header.BackButton />}
      />
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
