import React, { useState, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import styles from './Recruiting.style';
import SwitchSelector from 'react-native-switch-selector';
import { palette, typo } from '@/styles';
import { StringInput } from '@/components';

interface Props {
  need_people: string;
  need_price: string;
  setPeople: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
}

function Recruiting({
  need_people,
  need_price,
  setPeople,
  setPrice,
}: Props): JSX.Element {
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
      <View style={styles.subContainer}>
        <StringInput
          style={styles.text}
          placeholderStyle={styles.text}
          keyboardType="number-pad"
          placeholder={str}
          onChangeText={(txt) => changeNumber(txt, selected)}
          value={selected == 0 ? need_people : need_price}
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
          initial={0}
          onPress={(value) => setSelected(value as number)}
          height={30}
          textStyle={{ ...typo.semiTitle }}
          selectedTextStyle={{ ...typo.semiTitle }}
          backgroundColor={palette.whiteGray}
          buttonColor={palette.white}
          selectedColor={'black'}
          borderRadius={7}
          style={{ width: '90%' }}
          selectedTextContainerStyle={styles.selectedBox}
        />
      </View>
      {selected == 0 ? Input('필요인원', 5) : Input('필요금액', 10)}
    </View>
  );
}

export default Recruiting;
