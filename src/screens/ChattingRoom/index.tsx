import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert } from 'react-native';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolBar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderDay,
} from './ChatRender';
import initialMessages from './messages';
import ChattingRoomStyle from './ChattingRoom.style';

const Chats = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const onSend = (newMessages: any) => {
    setMessages((prevMessages: any) =>
      GiftedChat.append(prevMessages, newMessages)
    );
  };

  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Aaron',
        avatar: 'https://placeimg.com/150/150/any',
      }}
      alignTop
      alwaysShowSend
      scrollToBottom
      // showUserAvatar
      renderAvatarOnTop
      renderUsernameOnMessage
      bottomOffset={26}
      onPressAvatar={() => Alert.alert('into the unknown~')}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderAvatar={renderAvatar}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      renderMessage={renderMessage}
      renderMessageText={renderMessageText}
      timeFormat={'LT'}
      // renderMessageImage
      renderDay={renderDay}
      isCustomViewBottom
      messagesContainerStyle={ChattingRoomStyle.container}
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag: string) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
  );
};

export default Chats;
