import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@/components';
import { flexRow } from '@/styles/wrapper';

import styles from './Check.style';

export interface ICheckProps {
  title: string;
  checked: boolean;
  isOptional: boolean;
  onPress: () => void;
}

function Check({
  title,
  checked,
  isOptional,
  onPress,
}: ICheckProps): JSX.Element {
  const navigation = useNavigation();

  const goToTOS = () => {
    navigation.navigate('TOS', { title, checked, isOptional, onPress });
  };

  return (
    <View style={styles.container}>
      <Button
        title=""
        style={checked ? styles.buttonTrue : styles.buttonFalse}
        onPress={onPress}
      />
      <View style={styles.textWrapper}>
        <View style={flexRow}>
          <Text style={styles.title}>{title}</Text>
          {isOptional ? (
            <Text style={styles.optional}>(선택)</Text>
          ) : (
            <Text style={styles.mandatory}>(필수)</Text>
          )}
        </View>
        <Button
          title="내용보기"
          textStyle={styles.contentBtn}
          onPress={goToTOS}
        />
      </View>
    </View>
  );
}

export default Check;
