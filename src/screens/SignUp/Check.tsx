import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'native-base';
import React from 'react';

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
    navigation.navigate('TOS');
  };

  return (
    <View>
      {/* FIXME: 틀만 잡아놨어요 */}
      <Button title="" style={{}} onPress={onPress} />
      <Text>{title}</Text>
      <Text>{isOptional ? '(선택)' : '(필수)'}</Text>
      <Button title="내용보기" style={{}} onPress={goToTOS} />
    </View>
  );
}

export default Check;
