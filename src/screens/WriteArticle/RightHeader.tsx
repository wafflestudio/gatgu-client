import { Label } from 'native-base';
import React, { useState } from 'react';
import { ScrollView, Button, Text } from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { articleAPI } from '@/apis';
import { useNavigation } from '@react-navigation/native';
import { IArticleProps } from '@/types/article';

function RightHeader(article: IArticleProps): JSX.Element {
  const navigation = useNavigation();

  const submit = () => {
    articleAPI.create(article).then(() => {
      // TODO: redirect
    });
    navigation.navigate('Article');
  };

  return (
    <TouchableHighlight onPress={submit}>
      <Text>완료</Text>
    </TouchableHighlight>
  );
}

export default RightHeader;
