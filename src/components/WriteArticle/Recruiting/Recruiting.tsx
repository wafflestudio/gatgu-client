import React, { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native';

import { StringInput } from '@/components';

import waStyles from '../WriteArticle.style';
import styles from './Recruiting.style';

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

  return (
    <View style={styles.bigContainer}>
      <View style={styles.switchContainer}>
        <Text>모금금액/필요금액</Text>
        {/** TODO @juimdpp 화면 확인 가능할 때 디자인 수정하기*/}
      </View>
      {Input('필요금액', 10)}
    </View>
  );
}

export default Recruiting;
