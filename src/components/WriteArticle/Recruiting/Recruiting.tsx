import React, { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native';
import styles, { switchSelector } from './Recruiting.style';
import waStyles from '../WriteArticle.style';
import SwitchSelector from 'react-native-switch-selector';
import { StringInput } from '@/components';
import { IS_PEOPLE } from '@/constants/Enum';

interface RecruitingProps {
  needPeople: number;
  needPrice: number;
  selected: number;
  setPeople: Dispatch<SetStateAction<number>>;
  setPrice: Dispatch<SetStateAction<number>>;
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
    console.log(num);
    // code for dismissing all letters
    // code for max limit
    if (num === IS_PEOPLE) setPeople(txt);
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
          onChangeText={(txt) => changeNumber(parseInt(txt), selected)}
          value={
            selected === IS_PEOPLE
              ? needPeople.toString()
              : needPrice.toString()
          }
          maxLength={maxL}
        />
        <Text>{selected === IS_PEOPLE ? '명' : '원'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.bigContainer}>
      <View style={styles.switchContainer}>
        <SwitchSelector
          options={options}
          onPress={(value) => {
            console.log(value);
            setSelected(Number(value));
          }}
          {...switchSelector}
        />
      </View>
      {selected === IS_PEOPLE ? Input('필요인원', 5) : Input('필요금액', 10)}
    </View>
  );
}

export default Recruiting;
