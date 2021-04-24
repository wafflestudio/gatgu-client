import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from 'native-base';

import { palette } from '@/styles';

import styles from './CheckBox.style';

interface CheckBoxProps {
  selected: boolean;
  onPress: () => void;
  size: number;
  iconSize: number;
  wrapperStyle?: StyleProp<ViewStyle>;
  // textStyle?: StyleProp<TextStyle>;
  [x: string]: any;
}

function CheckBox({
  selected,
  onPress,
  size,
  iconSize,
  wrapperStyle,
  // textStyle,
  ...rest
}: CheckBoxProps): JSX.Element {
  return (
    <View
      style={[
        { borderRadius: size / 2, height: size, width: size },
        selected
          ? {
              borderColor: palette.blue,
              borderWidth: 1,
              backgroundColor: palette.blue,
            }
          : {
              borderColor: palette.gray,
              borderWidth: 1,
            },
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Icon
        name="done"
        size={iconSize}
        color={selected ? 'white' : palette.gray}
      />
    </View>
  );
}

export default CheckBox;

/*
<View style={{
          width: 2,
          backgroundColor: 'red',
          height: 8,
          transform: [{rotate: '130deg'}],
        }}/>
        <View style={{
          position: 'relative',
          bottom: 15,
          left: 9,
          width: 2,
          backgroundColor: 'red',
          height: 17,
          transform: [{rotate: '40deg'}],
        }}/>
*/