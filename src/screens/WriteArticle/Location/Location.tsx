import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import waStyles from '../WriteArticle.style';
import { StringInput } from '@/components';

interface LocationProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

function Location({ location, setLocation }: LocationProps): JSX.Element {
  return (
    <View style={waStyles.subContainer}>
      <StringInput
        value={location}
        style={waStyles.text}
        placeholder="거래지역"
        placeholderStyle={waStyles.placeHolder}
        onChangeText={setLocation}
      />
    </View>
  );
}
export default Location;
