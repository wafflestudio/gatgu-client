import React from 'react';
import { View, Text } from 'react-native';

import ErrorStyles from './Error.style';

interface IErrorProps {
  status: number;
}

// TODO: @ssu1018
// - change status to statusMsg
// when: ~3월 말

function Error({ status }: IErrorProps): JSX.Element {
  return (
    <View style={ErrorStyles.container}>
      <Text>{status}</Text>
    </View>
  );
}

export default Error;
