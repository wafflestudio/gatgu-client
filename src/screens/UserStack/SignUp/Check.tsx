import React from 'react';
import { View, Text } from 'react-native';

import { Button } from '@/components';
import { GCheckbox, GSpace } from '@/components/Gatgu';

import styles from './Check.style';

interface ICheckProps {
  title: string;
  checked: boolean;
  isOptional?: boolean;
  onPress: () => void;
  onPressTerm: () => void;
}

const TermCheck: React.FC<ICheckProps> = ({
  title,
  checked,
  isOptional = false,
  onPress,
  onPressTerm,
}: ICheckProps) => {
  return (
    <View style={styles.container}>
      <GCheckbox checked={checked} onPress={onPress} />
      <GSpace w={10} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <GSpace w={2} />
        {isOptional ? (
          <Text style={styles.optional}>(선택)</Text>
        ) : (
          <Text style={styles.mandatory}>(필수)</Text>
        )}
      </View>

      <Button
        title="내용보기"
        textStyle={styles.contentBtn}
        onPress={onPressTerm}
      />
    </View>
  );
};

export default TermCheck;
