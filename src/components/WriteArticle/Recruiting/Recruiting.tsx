import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { StringInput } from '@/components';
import { typo } from '@/styles';

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
        <TextInput
          style={waStyles.text}
          // placeholderStyle={waStyles.placeHolder}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={(txt: string) => setPrice(txt)}
          value={`${needPrice}`}
          maxLength={maxL}
        />
        <Text style={{ ...typo.semiTitle, flex: 1, paddingLeft: 10 }}>원</Text>
      </View>
    );
  };

  return <View>{Input('필요금액', 10)}</View>;
}

export default Recruiting;
