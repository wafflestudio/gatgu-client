import { View, Text } from 'native-base';
import { Button } from '@/components';
import React from 'react';

interface TOSProps {
  title: string;
  content: string;
  isOptional: boolean;
  confirm: () => void;
}

function TOSTemplate({
  title,
  content,
  isOptional,
  confirm,
}: TOSProps): JSX.Element {
  const optionString = (isOp: boolean) => (isOp ? '(선택)' : '(필수)');

  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>{optionString(isOptional)}</Text>
      </View>
      <View>
        <Text>{content}</Text>
      </View>
      <Button title="동의하기" onPress={confirm} />
    </View>
  );
}

export default TOSTemplate;
