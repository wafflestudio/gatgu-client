import React from 'react';
import { View, Text } from 'react-native';
import SystemStyle from './SystemMessage.style';

interface ISystemMessageProps {
  message: string;
  previousSystem: boolean | undefined;
}

function SystemMessage({
  message,
  previousSystem,
}: ISystemMessageProps): JSX.Element {
  return (
    <View style={SystemStyle.systemWrapper}>
      <View
        style={[SystemStyle.box, !previousSystem && SystemStyle.marginBottom24]}
      >
        <Text style={SystemStyle.systemText}>{message}</Text>
      </View>
    </View>
  );
}

export default SystemMessage;
