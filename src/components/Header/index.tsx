import { Label } from 'native-base';
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
} from 'react-native';

// TODO: make use of props: title: string
const Header = () => {
  return (
    <View style={styles.header}>
      <Text>Header that should be uniform and fixed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 75,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
