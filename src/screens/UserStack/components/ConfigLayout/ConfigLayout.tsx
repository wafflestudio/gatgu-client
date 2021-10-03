import React from 'react';

import { Box, Flex } from 'native-base';
import styled from 'styled-components/native';

import { GSpace, GText } from '@/components/Gatgu';
import { palette } from '@/styles';

export interface IConfigLayoutItem {
  label: string;
  rightText?: string;
  onPress?: () => void;
}

export interface IConfigLayoutProps {
  title: string;
  items: IConfigLayoutItem[];
}

const StyledConfigLayout = styled(Flex)`
  margin-top: 25px;
  padding-bottom: 10px;
  border-bottom-width: 0.5px;
  border-color: ${palette.borderGray};
`;

const StyledConfigItem = styled.TouchableOpacity`
  height: 40px;
  padding: 0px 20px;
`;

const StyledConfigItemView = styled.View`
  flex-direction: row;
  justify-content: space-between;

  height: 40px;
  padding: 0px 20px;
`;

const ConfigLayout: React.FC<IConfigLayoutProps> = ({ title, items }) => {
  const renderItems = () => {
    return items.map((item, idx) => {
      if (item.rightText) {
        return (
          <StyledConfigItemView key={idx}>
            <GText size={18}>{item.label}</GText>
            <GText bold size={16}>
              {item.rightText}
            </GText>
          </StyledConfigItemView>
        );
      }

      return (
        <StyledConfigItem key={idx} onPress={item.onPress}>
          <GText size={18}>{item.label}</GText>
        </StyledConfigItem>
      );
    });
  };

  return (
    <StyledConfigLayout>
      <Box paddingLeft="20px">
        <GText bold size={18}>
          {title}
        </GText>
      </Box>
      <GSpace h={25} />
      {renderItems()}
    </StyledConfigLayout>
  );
};

export default ConfigLayout;
