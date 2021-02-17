import React, { RefObject, useRef, createRef } from 'react';
import { View, Button, Text } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Example() {
  const refRBSheet = createRef<RBSheet>();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}
    >
      <Text>Hello</Text>
      <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      />
      <Button
        title="CLOSE BOTTOM SHEET"
        onPress={() => refRBSheet.current.close()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      ></RBSheet>
    </View>
  );
}
