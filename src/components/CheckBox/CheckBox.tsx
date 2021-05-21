import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, View } from 'native-base';

import { palette } from '../../styles';

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
