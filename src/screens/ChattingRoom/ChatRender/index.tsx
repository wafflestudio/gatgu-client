/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  GiftedChatProps,
  Day,
  MessageImage,
} from 'react-native-gifted-chat';
import MessageStyle from './Message.style';
export const renderAvatar = (props: GiftedChatProps) => (
  <Avatar {...props} imageStyle={{ left: MessageStyle.avartar, right: {} }} />
);

export const renderSystemMessage = (props: GiftedChatProps): JSX.Element => (
  <SystemMessage
    {...props}
    wrapperStyle={MessageStyle.systemWrapper}
    textStyle={MessageStyle.systemText}
  />
);

//  outer chatting Container that contains user profile
export const renderMessage = (props: GiftedChatProps): JSX.Element => (
  <Message
    {...props}
    key={'msg'}
    containerStyle={{
      left: MessageStyle.msgContainer,
      right: MessageStyle.msgContainer,
    }}
  />
);

export const renderDay = (props: GiftedChatProps): JSX.Element => (
  <Day
    {...props}
    containerStyle={{
      marginHorizontal: 20,
    }}
    textStyle={{
      textDecorationColor: 'gray',
    }}
  />
);

// inner chatting Container
export const renderBubble = (props: GiftedChatProps): JSX.Element => (
  <Bubble
    {...props}
    usernameStyle={MessageStyle.nameText}
    containerStyle={{
      left: {},
      right: {},
    }}
    wrapperStyle={{ left: {}, right: MessageStyle.msgContainer }}
  />
);

//  chatting
export const renderMessageText = (props: GiftedChatProps): JSX.Element => (
  <MessageText
    {...props}
    containerStyle={{
      left: MessageStyle.opponentChatBox,
      right: MessageStyle.myChatBox,
    }}
    textStyle={{
      left: MessageStyle.chatText,
      right: MessageStyle.chatText,
    }}
    linkStyle={{
      left: { color: 'blue' },
      right: { color: 'blue' },
    }}
  />
);

export const renderMessageImage = (props: GiftedChatProps): JSX.Element => (
  <MessageImage {...props} imageStyle={MessageStyle.messageImage} />
);
