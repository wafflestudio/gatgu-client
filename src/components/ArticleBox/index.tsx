import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { AspectRatio, Flex, Image, Text } from 'native-base';

import { getPassedTime, getRemainTime } from '@/helpers/functions/time';
import { useAppNavigation } from '@/helpers/hooks/useAppNavigation';
import { AppRoutes } from '@/helpers/routes';
import { IArticleSummary } from '@/types/article';

import { GText } from '../Gatgu';
import styles from './ArticleBox.style';

const ArticleBox: React.FC<IArticleSummary> = ({
  article_id,
  title,
  trading_place,
  time_in,
  images,
  price_min,
  article_status,
  updated_at,
}) => {
  const navigation = useAppNavigation();

  return (
    <TouchableOpacity
      style={styles.postBox}
      onPress={() =>
        navigation.navigate(AppRoutes.ArticleStack, {
          screen: AppRoutes.Article,
          params: {
            id: article_id,
          },
        })
      }
    >
      <AspectRatio ratio={1}>
        <Image
          source={{
            uri: images[0]?.img_url,
          }}
          fallbackSource={require('@/assets/images/defaultThumnail.png')}
          loadingIndicatorSource={require('@/assets/images/defaultThumnail.png')}
          alt="article thumnail"
          borderRadius="13px"
        />
      </AspectRatio>
      <View style={styles.articleBox}>
        <Flex>
          <GText size={18}>{title}</GText>
          <View style={styles.infoWrapper}>
            <Text
              style={styles.description}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {getPassedTime(updated_at)}&nbsp; · &nbsp;
              {getRemainTime(time_in)}&nbsp; · &nbsp;
              {trading_place}
            </Text>
          </View>
        </Flex>
        <Flex direction="row" justify="flex-end">
          <Text style={{ ...styles.priceText }} bold>
            {article_status.cur_price_sum}원
          </Text>
          <Text style={styles.priceText}> / {price_min}원</Text>
        </Flex>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleBox;
