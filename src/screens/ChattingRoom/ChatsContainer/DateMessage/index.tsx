import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import DateMsgStyle from './DateMessage.style';
import ChatContainerStyle from '../ChatContainer.style';
interface IDateMessage {
  date: string;
}

function DateMessage({ date }: IDateMessage): JSX.Element {
  const sentDay = useMemo(() => {
    const convertedDate = new Date(date);
    return `
      ${convertedDate.getFullYear()}년 
      ${convertedDate.getMonth() + 1}월
      ${convertedDate.getDate() + 1}일
    `;
  }, [date]);

  return (
    <View style={DateMsgStyle.dateContainer}>
      <View style={DateMsgStyle.middleLine} />
      <Text style={ChatContainerStyle.timeText}>{sentDay}</Text>
      <View style={DateMsgStyle.middleLine} />
    </View>
  );
}

export default DateMessage;
