import React, { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

import { StringInput } from '@/components';
import { Need } from '@/constants/Enum';

import waStyles from '../WriteArticle.style';
import styles, { switchSelector } from './Recruiting.style';

interface RecruitingProps {
  needPeople: string;
  needPrice: string;
  selected: number;
  setPeople: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setSelected: Dispatch<SetStateAction<number>>;
}

function Recruiting({
  needPeople,
  needPrice,
  selected,
  setPeople,
  setPrice,
  setSelected,
}: RecruitingProps): JSX.Element {
  const options = [
    { label: '모집인원/필요인원', value: '1' },
    { label: '모금금액/필요금액', value: '2' },
  ];

  const changeNumber = (txt: number, num: number) => {
    if (num === Need.IS_PEOPLE) setPeople(`${txt}`);
    else setPrice(`${txt}`);
  };

  const Input = (str: string, maxL: number) => {
    return (
      <View style={waStyles.subContainer}>
        <StringInput
          style={waStyles.text}
          placeholderStyle={waStyles.placeHolder}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={(txt: string) => changeNumber(parseInt(txt), selected)}
          value={selected === Need.IS_PEOPLE ? `${needPeople}` : `${needPrice}`}
          maxLength={maxL}
        />
        <Text>{selected === Need.IS_PEOPLE ? '명' : '원'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.switchContainer}>
        <SwitchSelector
          options={options}
          onPress={(value) => {
            setSelected(Number(value));
          }}
          {...switchSelector}
        />
      </View>
      {selected === Need.IS_PEOPLE
        ? Input('필요인원', 5)
        : Input('필요금액', 10)}
    </View>
  );
}

export default Recruiting;
