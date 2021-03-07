import React from 'react';
import { View, Text } from 'react-native';

import ErrorStyles from './Error.style';

interface IErrorProps {
  status: number;
}

function Error({ status }: IErrorProps): JSX.Element {
  return (
    <View style={ErrorStyles.container}>
      <Text>{status}</Text>
    </View>
  );
}

export default Error;
