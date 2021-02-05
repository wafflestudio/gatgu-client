import { Label } from 'native-base';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';

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

function Header({ title, left, right }: HeaderProps) {
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

const styles = StyleSheet.create({
  header: {
    height: 75,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
