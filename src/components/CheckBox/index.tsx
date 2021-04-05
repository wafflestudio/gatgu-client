import React, { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View } from 'native-base';

import styles from './CheckBox.style';

interface CheckBoxProps {
  value: boolean;
  onPress: () => void;
  icon: string;
  iconSize: number;
  iconColor: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  // textStyle?: StyleProp<TextStyle>;
  [x: string]: any;
}

function CheckBox({
  value,
  onPress,
  icon,
  iconSize,
  iconColor,
  wrapperStyle,
  // textStyle,
  ...rest
}: CheckBoxProps): JSX.Element {
  const myIcon = <Icon name={icon} size={iconSize} color={iconColor} />;
  return (
    <View>
      <View style={wrapperStyle ? wrapperStyle : styles.defaultWrapper}>
        {myIcon}
      </View>
    </View>
  );
}

export default CheckBox;
