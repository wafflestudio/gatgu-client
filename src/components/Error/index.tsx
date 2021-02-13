import React from 'react';
import { View, Text } from 'react-native';
import ErrorStyles from './Error.style';
interface IErrorProps {
  status: number;
}

function Error({ status }: IErrorProps) {
  return (
    <View style={ErrorStyles.container}>
      <Text>{status}</Text>
    </View>
  );
}

export default Error;
