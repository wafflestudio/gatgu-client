/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Alert, Text } from 'react-native';
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  GiftedChatProps,
} from 'react-native-gifted-chat';
import InputToolBarStyle from './InputToolBar.style';
export const renderInputToolbar = (props: GiftedChatProps): JSX.Element => (
  <InputToolbar {...props} containerStyle={InputToolBarStyle.inputContainer} />
);

export const renderActions = (props: GiftedChatProps): JSX.Element => (
  <Actions
    {...props}
    containerStyle={InputToolBarStyle.actionIcon}
    icon={() => (
      // FIXME:
      // use Svg Icon
      <Text> 플러스 </Text>
    )}
    options={{
      카메라: () => {
        Alert.alert('나는 카메라');
      },
      앨범: () => {
        Alert.alert('나는 앨범');
      },
      취소: () => {
        Alert.alert('나는 취소');
      },
    }}
    optionTintColor="black"
  />
);

export const renderComposer = (props: GiftedChatProps): JSX.Element => (
  <Composer
    {...props}
    textInputStyle={InputToolBarStyle.placeHolder}
    placeholder={'메세지를 입력하세요'}
  />
);

export const renderSend = (props: GiftedChatProps): JSX.Element => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={InputToolBarStyle.inputIcon}
  >
    {/*  FIXME: */}
    {/*  use Svg Icon */}
    <Text> 보내기 </Text>
  </Send>
);
