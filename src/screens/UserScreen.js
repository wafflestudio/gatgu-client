// 스크린은 여기에
import React from 'react';
import { View, Text } from 'react-native';

import { Button } from '@/components';

export default function UserScreen() {
  return (
    <View>
      <Text>This is UserScreen</Text>
      <Button
        title="hi"
        onPress={() => {
          console.log('hi');
        }}
      />
    </View>
  );
}
