import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import styles from './Header.style';

// need to pass functions for the buttons
export interface HeaderProps {
  title: string;
  left: boolean;
  // left_text: string,
  // left_function: ??,
  right: boolean;
  // right_text: string
  // left_fucntion: ??
}

function Header({ title, left, right }: HeaderProps): JSX.Element {
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
