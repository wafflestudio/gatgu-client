import React from 'react';

import { Flex, Text } from 'native-base';

import { StringArticleStatus } from '@/constants/article';
import { ArticleStatus } from '@/enums';
import { getRemainTime } from '@/helpers/functions';
import { getPassedTime } from '@/helpers/functions/time';
import { palette, typo } from '@/styles';
import { IArticleProps } from '@/types/article';

import ArticleHeaderStyle from './ArticleHeader.style';

type TArticleHeaderProps = Pick<
  IArticleProps,
  | 'title'
  | 'time_in'
  | 'trading_place'
  | 'price_min'
  | 'article_status'
  | 'updated_at'
>;

const StatusColorMap = {
  [ArticleStatus.Gathering]: palette.yellow,
  [ArticleStatus.Dealing]: palette.blue,
  [ArticleStatus.Complete]: palette.gray,
  [ArticleStatus.Expire]: palette.gray,
};

const ArticleHeader: React.FC<TArticleHeaderProps> = ({
  title,
  time_in,
  updated_at,
  article_status,
  trading_place,
  price_min,
}) => {
  return (
    <Flex style={ArticleHeaderStyle.box}>
      <Flex direction="row" paddingBottom={18}>
        <Text
          style={typo.bigTitle}
          color={StatusColorMap[article_status.progress_status]}
          marginRight={15}
          bold
        >
          {StringArticleStatus[article_status.progress_status]}
        </Text>
        <Text style={typo.bigTitle} color={palette.dark} bold>
          {title}
        </Text>
      </Flex>
      <Flex>
        <Flex direction="row" mb="8px">
          <Text style={ArticleHeaderStyle.infoText}>
            {getPassedTime(updated_at)}&nbsp; · &nbsp;
          </Text>
          <Text style={ArticleHeaderStyle.infoText}>
            {getRemainTime(time_in)}
          </Text>
        </Flex>
        <Flex direction="row" mb="8px">
          <Text marginRight="16px" style={ArticleHeaderStyle.infoText}>
            거래 지역
          </Text>
          <Text color={palette.dark} style={typo.info}>
            {trading_place}
          </Text>
        </Flex>
        <Flex direction="row">
          <Text color={palette.gray} marginRight="16px" style={typo.info}>
            모집 금액
          </Text>
          <Text color={palette.blue} style={typo.info} bold>
            {article_status.cur_price_sum}원
          </Text>
          <Text color={palette.dark} style={typo.info}>
            {` / ${price_min}원`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ArticleHeader;
