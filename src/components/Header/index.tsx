import React from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import styles from './Header.style';

// need to pass functions for the buttons
export interface HeaderProps {
  title: string;
  leftHeader?: JSX.Element | null;
  rightHeader?: JSX.Element | null;
}

function Header({ title, leftHeader, rightHeader }: HeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.subContainer}>{leftHeader}</View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.subContainer}>{rightHeader}</View>
    </View>
  );
}

export default Header;
