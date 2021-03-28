import React, { Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';

import { StringInput } from '@/components';

import waStyles from '../WriteArticle.style';
import styles from './DueDate.style';

interface DueDateProps {
  dueDate: string;
  setDueDate: Dispatch<SetStateAction<string>>;
}

function DueDate({ dueDate, setDueDate }: DueDateProps): JSX.Element {
  return <View></View>;
}
export default DueDate;
