import React from 'react';
import { View, Text } from 'react-native';

import { StringInput } from '@/components';

import waStyles from '../WriteArticle.style';

interface RecruitingProps {
  needPrice: string;
  setPrice: (inp: string) => void;
}

// TODO @juimdpp
// Check if this works correctly after API works
function Recruiting({ needPrice, setPrice }: RecruitingProps): JSX.Element {
  const Input = (str: string, maxL: number) => {
    return (
      <View style={waStyles.subContainer}>
        <StringInput
          style={waStyles.text}
          placeholderStyle={waStyles.placeHolder}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={(txt: string) => setPrice(txt)}
          value={`${needPrice}`}
          maxLength={maxL}
        />
        <Text>원</Text>
      </View>
    );
  };

  return <View>{Input('필요금액', 10)}</View>;
}

export default Recruiting;
