import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { typo } from '@/styles';

import waStyles from '../WriteArticle.style';

interface RecruitingProps {
  needPrice: number | null;
  setPrice: (inp: number | null) => void;
  editable: boolean;
}

// TODO @juimdpp
// Check if this works correctly after API works
function Recruiting({
  needPrice,
  setPrice,
  editable,
}: RecruitingProps): JSX.Element {
  const handlePrice = (price: string) => {
    if (price.length === 0) {
      setPrice(null);
      return;
    }

    setPrice(parseInt(price.replaceAll(',', '')));
  };

  const Input = (str: string, maxL: number) => {
    const formattedPrice = needPrice
      ? Intl.NumberFormat('ko', {
          style: 'currency',
          currency: 'KRW',
        })
          .format(needPrice)
          .replace('₩', '')
      : '';

    return (
      <View style={waStyles.subContainer}>
        <Text style={{ ...typo.semiTitle, paddingLeft: 20 }}>₩</Text>
        <TextInput
          style={[waStyles.text, { paddingLeft: 10, paddingBottom: 8 }]}
          // placeholderStyle={waStyles.placeHolder}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={handlePrice}
          value={formattedPrice}
          maxLength={maxL}
          editable={editable}
        />
      </View>
    );
  };

  return <View>{Input('필요금액', 10)}</View>;
}

export default Recruiting;
