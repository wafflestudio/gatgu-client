import { View, Text } from 'native-base';
import { Button } from '@/components';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SignUpStackParamList } from '@/types/navigation';
import contents from './content';

interface TOSProps {
  title: string;
  isOptional: boolean;
  confirm: () => void;
}

function TOSTemplate(): JSX.Element {
  const optionString = (isOp: boolean) => (isOp ? '(선택)' : '(필수)');
  const route = useRoute<RouteProp<SignUpStackParamList, 'TOS'>>();
  const { title, isOptional, confirm }: TOSProps = route.params;

  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>{optionString(isOptional)}</Text>
      </View>
      <View>
        <Text>{contents[title]}</Text>
      </View>
      <Button title="동의하기" onPress={confirm} />
    </View>
  );
}

export default TOSTemplate;
