import React from 'react';
import { View, Text } from 'react-native';

interface IErrorProps {
  status: number;
}

function Error({ status }: IErrorProps) {
  return (
    <View>
      <Text>{status}</Text>
    </View>
  );
}

export default Error;
