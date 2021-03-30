import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, TouchableHighlight, Text, Modal, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import _ from 'lodash';
import { Label } from 'native-base';

// import DateTimePickerModal from "react-native-modal-datetime-picker";
// npm i react-native-modal-datetime-picker @react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '@/components';
import { palette, typo } from '@/styles';

import styles from './DueDate.style';

interface DueDateProps {
  dueDate: Date;
  setDueDate: Dispatch<SetStateAction<Date>>;
}
const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const returnArrayDate = (today: Date) => {
  const arr = [];
  const current: Date = today;
  arr.push({ day: '오늘', date: current.getDate(), selected: false });
  for (let index = 0; index < 30; index++) {
    current.setDate(current.getDate() + 1);
    arr.push({
      day: dayOfWeek[current.getDay()],
      date: current.getDate(),
      selected: false,
    });
  }
  return arr;
};
const today = new Date();
const initWeek = returnArrayDate(today);

function DueDate({ dueDate, setDueDate }: DueDateProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(today);
  const [dayArr, setDayArr] = useState(initWeek);

  const onChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate ? selectedDate : date);
  };
  const showDatePicker = () => {
    setModalVisible(!modalVisible);
  };
  const selectDay = (indx: number) => {
    const temp = _.cloneDeep(initWeek);
    temp[indx].selected = true;
    setDayArr(temp);
  };
  const handleComplete = () => {
    setModalVisible(false);
    const res = new Date();
    // set time
    res.setHours(date.getHours());
    res.setMinutes(date.getMinutes());
    // find chosen day
    const index = dayArr.findIndex((item) => item.selected);
    // set to chosen day
    res.setDate(res.getDate() + index);

    setDueDate(res);
  };

  const renderDates = dayArr.map((item, indx) => (
    <TouchableHighlight key={indx} onPress={() => selectDay(indx)}>
      <View
        style={[
          styles.dayContainer,
          item.selected ? styles.selected : styles.nonSelected,
        ]}
      >
        <Text
          style={
            item.selected ? styles.dayTextSelected : styles.dayTextNonSelected
          }
        >
          {item.day}
        </Text>
        <Text
          style={
            item.selected ? styles.dayTextSelected : styles.dayTextNonSelected
          }
        >
          {item.date}
        </Text>
      </View>
    </TouchableHighlight>
  ));

  return (
    <View>
      <View style={styles.labelContainer}>
        <TouchableHighlight
          onPress={() => showDatePicker()}
          underlayColor={palette.whiteGray}
        >
          <Label style={styles.label}>모집기한</Label>
        </TouchableHighlight>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Text style={{ ...typo.bigTitle }}>모집기한</Text>
            </View>
            <View style={styles.completeButton}>
              <Button
                title={'완료'}
                onPress={() => handleComplete()}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
          <View style={styles.scrollDayContainer}>
            <ScrollView horizontal={true}>{renderDates}</ScrollView>
          </View>
          <View style={{ width: '100%', height: '100%' }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              is24Hour={true}
              display="spinner"
              minuteInterval={30}
              onChange={(event, selectedDate) => onChange(selectedDate)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default DueDate;

{
  /* <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="time"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    /> */
}
