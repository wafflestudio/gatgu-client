import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import styles from './Header.style';

// need to pass functions for the buttons
export interface IHeaderProps {
  title: string;
  titleShown?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  left?: React.ReactNode;
  leftCallback?: any;
  leftStyle?: StyleProp<ViewStyle>;
  right?: React.ReactNode;
  rightCallback?: any;
  rightStyle?: StyleProp<ViewStyle>;
}

function Header({
  title,
  left,
  right,
  titleShown,
  titleStyle,
  leftCallback,
  rightCallback,
  leftStyle,
  rightStyle,
  titleContainerStyle,
}: IHeaderProps): JSX.Element {
  return (
    <View style={[styles.header, styles.SafeArea]}>
      {left ? (
        <TouchableHighlight
          style={[styles.leftButton, leftStyle]}
          onPress={leftCallback}
        >
          {left}
        </TouchableHighlight>
      ) : (
        <View style={styles.leftButton} />
      )}
      {titleShown && (
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <Text style={[styles.basicTitleText, titleStyle]}>{title}</Text>
        </View>
      )}
      {right ? (
        <TouchableHighlight
          style={[styles.rightButton, rightStyle]}
          onPress={rightCallback}
        >
          {right}
        </TouchableHighlight>
      ) : (
        <View style={styles.rightButton} />
      )}
    </View>
  );
}

export default Header;
