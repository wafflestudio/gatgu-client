import React from 'react';
import { View, Text } from 'react-native';

interface ISystemMessageProps {
  message: string;
}

function SystemMessage({ message }: ISystemMessageProps): JSX.Element {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}

export default SystemMessage;
