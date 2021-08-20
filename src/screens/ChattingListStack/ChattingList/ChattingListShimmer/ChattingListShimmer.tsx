import React from 'react';
import { View } from 'react-native';

import styled from 'styled-components/native';

import { palette } from '@/styles';

const StyledImage = styled.View`
  background-color: ${palette.whiteGray};
  width: 64px;
  height: 64px;
  border-radius: 50px;
`;
const StyledWriter = styled.View`
  background-color: ${palette.whiteGray};
  width: 150;
  height: 18;
  margin-bottom: 3;
  border-radius: 4px;
`;
const StyledRecentMessage = styled.View`
  background-color: ${palette.whiteGray};
  height: 18px;
  width: 100;
  margin-bottom: 3;
  border-radius: 4px;
`;
const StyledTime = styled.View`
  background-color: ${palette.whiteGray};
  width: 50px;
  height: 18px;
  border-radius: 4px;
`;
const StyledTitle = styled.View`
  background-color: ${palette.whiteGray};
  width: 140px;
  margin-bottom: 3;
  height: 18px;
`;

export const ChattingBoxShimmer: React.FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        padding: 17,
        borderBottomColor: palette.whiteGray,
      }}
    >
      <StyledImage />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <StyledWriter />
          <StyledTime />
        </View>
        <StyledRecentMessage />
        <StyledTitle />
      </View>
    </View>
  );
};

const ChattingListShimmer: React.FC = () => {
  return (
    <View
      style={{ backgroundColor: palette.white, height: '100%', width: '100%' }}
    >
      {new Array(5).fill(null).map((_, idx) => (
        <ChattingBoxShimmer key={`${idx}`} />
      ))}
    </View>
  );
};
export default ChattingListShimmer;
