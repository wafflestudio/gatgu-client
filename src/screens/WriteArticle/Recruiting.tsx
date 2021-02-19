import React, { useState, Dispatch, SetStateAction, useMemo } from 'react';
import { View, Text } from 'react-native';
import styles, { switchSelector } from './Recruiting.style';
import waStyles from './WriteArticle.style';
import SwitchSelector from 'react-native-switch-selector';
import { StringInput } from '@/components';

interface RecruitingProps {
  needPeople: string;
  needPrice: string;
  setPeople: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
}

function Recruiting({
  needPeople,
  needPrice,
  setPeople,
  setPrice,
}: RecruitingProps): JSX.Element {
  const [selected, setSelected] = useState(0);

  const options = [
    { label: '모집인원/필요인원', value: '0' },
    { label: '모금금액/필요금액', value: '1' },
  ];

  const changeNumber = (txt: string, num: number) => {
    // code for dismissing all letters
    // code for max limit
    if (num === 0) setPeople(txt);
    else setPrice(txt);
  };

  const Input = (str: string, maxL: number) => {
    return (
      <View style={waStyles.subContainer}>
        <StringInput
          style={waStyles.text}
          placeholderStyle={waStyles.placeHolder}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={(txt) => changeNumber(txt, selected)}
          value={selected === 0 ? needPeople : needPrice}
          maxLength={maxL}
        />
      </View>
    );
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.switchContainer}>
        <SwitchSelector
          options={options}
          onPress={(value) => setSelected(Number(value))}
          {...switchSelector}
        />
      </View>
      {selected === 0 ? Input('필요인원', 5) : Input('필요금액', 10)}
    </View>
  );
}

export default Recruiting;
