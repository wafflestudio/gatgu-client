import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { View, TouchableHighlight, Text, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import _ from 'lodash';
import { DateTime } from 'luxon';
import { Modal } from 'native-base';

// import { Label } from 'native-base';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// npm i react-native-modal-datetime-picker @react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

import { GButton } from '@/components/Gatgu/GButton';
import { palette, typo } from '@/styles';

import styles from './DueDate.style';

interface DueDateProps {
  dueDate: Date;
  setDueDate: Dispatch<SetStateAction<Date>>;
  editable: boolean;
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

function DueDate({ dueDate, setDueDate, editable }: DueDateProps): JSX.Element {
  const [today, setToday] = useState(new Date());
  const [initWeek, setInitWeek] = useState(returnArrayDate(today));
  const [modalVisible, setModalVisible] = useState(false);
  const [dayArr, setDayArr] = useState(initWeek);

  const showDatePicker = () => {
    setModalVisible(!modalVisible);
    setToday(new Date());
    setInitWeek(returnArrayDate(new Date()));
  };
  const selectDay = (indx: number) => {
    const temp = _.cloneDeep(initWeek);
    temp[indx].selected = true;
    setDayArr(temp);

    const res = new Date();
    // set time
    // res.setHours(23, 59);

    // find chosen day
    // set to chosen day
    res.setDate(res.getDate() + indx);

    setDueDate(res);
  };
  const handleComplete = () => {
    setModalVisible(false);
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
    const iso = DateTime.fromJSDate(dueDate).toFormat(`yyyy-MM-dd`);
    return iso;
  }, [dueDate]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.labelContainer}>
        <TouchableHighlight
          onPress={() => editable && showDatePicker()}
          underlayColor={palette.whiteGray}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.label}>모집기한</Text>
            <Text style={styles.label}>{parsedDate} 23:59 까지</Text>
          </View>
        </TouchableHighlight>
      </View>
      {modalVisible && (
        <Modal isOpen>
          <Modal.Content style={{ height: 200, width: '100%' }}>
            <Modal.Header>
              <View style={[styles.headerContainer, { padding: 20 }]}>
                <View style={styles.titleContainer}>
                  <Text style={{ ...typo.bigTitle }}>모집기한</Text>
                </View>
                <GButton size="small" onPress={handleComplete}>
                  완료
                </GButton>
              </View>
            </Modal.Header>
            <Modal.Body>
              <View style={styles.scrollDayContainer}>
                <ScrollView horizontal={true}>{renderDates}</ScrollView>
              </View>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </View>
  );
}
export default DueDate;
