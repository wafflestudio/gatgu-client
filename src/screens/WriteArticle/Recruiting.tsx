import { Label } from 'native-base';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, TextInput } from 'react-native';
import styles from './Recruiting.style';

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
  const changeNumber = (txt: string, num: number) => {
    // code for dismissing all letters
    // code for max limit
    if (num === 0) setPeople(txt);
    else setPrice(txt);
  };

  return (
    <View style={styles.subContainer}>
      <View style={styles.recruitHalfContainer}>
        <Label style={styles.label}>모집인원: </Label>
        <TextInput
          style={styles.text}
          keyboardType="number-pad"
          placeholder="모집인원"
          onChangeText={(txt) => changeNumber(txt, 0)}
          value={need_people}
          maxLength={5}
        />
      </View>
      <View style={styles.recruitHalfContainer}>
        <Label style={styles.label}>모금금액: </Label>
        <TextInput
          style={styles.text}
          keyboardType="number-pad"
          placeholder="모집금액"
          onChangeText={(txt) => changeNumber(txt, 1)}
          value={need_price}
          maxLength={10}
        />
      </View>
    </View>
  );
}

export default Recruiting;
