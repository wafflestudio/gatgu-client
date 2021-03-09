import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheetProperties,
} from 'react-native';
import styles from './Header.style';

// need to pass functions for the buttons
export interface IHeaderProps {
  title: string;
  titleShown?: boolean;
  titleStyle?: StyleSheetProperties;
  left?: React.ReactNode;
  leftCallback?: any;
  leftStyle?: StyleSheetProperties;
  right?: React.ReactNode;
  rightCallback?: any;
  rightStyle?: StyleSheetProperties;
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
}: IHeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.subContainer}>
        {left && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => Alert.alert('Goback!')}
          >
            <Text>뒤로</Text>
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.subContainer}>
        {right && (
          <TouchableHighlight
            style={styles.button}
            onPress={() => Alert.alert('Complete!')}
          >
            <Text>설정</Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}

export default Header;
