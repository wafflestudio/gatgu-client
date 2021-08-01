import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { View, TouchableHighlight, Text, Modal, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import _ from 'lodash';
import { DateTime } from 'luxon';
import { Button } from 'native-base';

// import DateTimePickerModal from "react-native-modal-datetime-picker";
// npm i react-native-modal-datetime-picker @react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

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
  let curDate = current.getDate();
  arr.push({ day: '오늘', date: curDate, selected: false });
  for (let index = 0; index < 30; index++) {
    current.setDate(curDate + 1);
    curDate = current.getDate();
    arr.push({
      day: dayOfWeek[current.getDay()],
      date: curDate,
      selected: false,
    });
  }
  return arr;
};

function DueDate({ dueDate, setDueDate }: DueDateProps): JSX.Element {
  const [today, setToday] = useState(new Date());
  const [initWeek, setInitWeek] = useState(returnArrayDate(today));
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(today);
  const [dayArr, setDayArr] = useState(initWeek);

  const handleChange = (event: any, selectedDate: Date | undefined) => {
    setDate(selectedDate ? selectedDate : date);
  };
  const showDatePicker = () => {
    setModalVisible(!modalVisible);
    setToday(new Date());
    setInitWeek(returnArrayDate(new Date()));
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

  const parsedDate = useMemo(() => {
    const iso = DateTime.fromJSDate(dueDate).toFormat(`yyyy-MM-dd hh:mm`);
    return iso;
  }, [dueDate]);

  return (
    <View>
      <View style={styles.labelContainer}>
        <TouchableHighlight
          onPress={() => showDatePicker()}
          underlayColor={palette.whiteGray}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.label}>모집기한</Text>
            <Text style={styles.label}>{parsedDate}</Text>
          </View>
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
            <Button
              style={styles.completeButton}
              onPress={() => handleComplete()}
            >
              <Text style={styles.buttonText}>완료</Text>
            </Button>
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
              onChange={handleChange}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default DueDate;
