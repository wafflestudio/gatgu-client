import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View } from 'native-base';

import { palette } from '@/styles';

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
  size,
  iconSize,
}: // textStyle,
CheckBoxProps): JSX.Element {
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
