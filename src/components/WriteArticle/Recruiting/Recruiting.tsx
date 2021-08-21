import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { paddingLeft } from 'styled-system';

import { StringInput } from '@/components';
import { typo } from '@/styles';

import waStyles from '../WriteArticle.style';

interface RecruitingProps {
  needPrice: string;
  setPrice: (inp: string) => void;
  editable: boolean;
}

// TODO @juimdpp
// Check if this works correctly after API works
function Recruiting({
  needPrice,
  setPrice,
  editable,
}: RecruitingProps): JSX.Element {
  const Input = (str: string, maxL: number) => {
    return (
      <View style={waStyles.subContainer}>
        <Text style={{ ...typo.semiTitle, paddingLeft: 20 }}>₩</Text>
        <TextInput
          style={[waStyles.text, { paddingLeft: 10, paddingBottom: 8 }]}
          // placeholderStyle={waStyles.placeHolder}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={(txt: string) => setPrice(txt)}
          value={`${needPrice}`}
          maxLength={maxL}
          editable={editable}
        />
      </View>
    );
  };

  return <View>{Input('필요금액', 10)}</View>;
}

export default Recruiting;
