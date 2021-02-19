import { Label } from 'native-base';
import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import waStyles from './WriteArticle.style';
import { StringInput } from '@/components';

interface LinkProps {
  link: string;
  setLink: Dispatch<SetStateAction<string>>;
}

function Link({ link, setLink }: LinkProps): JSX.Element {
  return (
    <View style={waStyles.subContainer}>
      <StringInput
        value={link}
        style={waStyles.text}
        placeholder="구매링크"
        placeholderStyle={waStyles.placeHolder}
        onChangeText={setLink}
        multiline={true}
      />
    </View>
  );
}
export default Link;
