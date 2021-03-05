import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

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
    <View>
      <View />
      <Text>{sentDay}</Text>
      <View />
    </View>
  );
}

export default DateMessage;
