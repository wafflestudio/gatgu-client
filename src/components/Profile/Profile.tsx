import { View, Text, ImageBackground, TouchableHighlight } from 'react-native';
import styles from './Profile.Style';
import React, { useState } from 'react';

// TODO: remove this
const dummyInfo = {
  profileUrl: 'https://reactjs.org/logo-og.png',
  name: '같구',
  date: '1920-10-80',
  auth: false,
  grade: 2,
  emdrmqwltn: 128,
  dmdekqfbf: 97,
  e_response_time: 10,
  worjfogmlakdfbf: 100,
};

// Profile Component
const Profile = () => {
  // if option is open
  const [opOpen, setOpOpen] = useState(false);

  // profile image to display
  const profileImg = { uri: dummyInfo.profileUrl };

  // "뒤로" button onClick
  const goBack = () => {
    console.log('뒤로가기 어케하냐');
  };

  // "..." button onClick
  const showOptions = () => {
    console.log('모달 띄울거임');
  };

  // Header JSX: 뒤로, 더보기, ...
  const Header = (
    <View style={styles.header.container}>
      <TouchableHighlight style={styles.header.button} onPress={goBack}>
        <Text style={styles.header.title}>뒤로</Text>
      </TouchableHighlight>
      <Text style={styles.header.title}>더 보기</Text>
      <TouchableHighlight style={styles.header.button} onPress={showOptions}>
        <Text style={styles.header.title}>...</Text>
      </TouchableHighlight>
    </View>
  );

  // Info JSX: 유저 이름 ~ 인증 여부
  const Info = (
    <View style={styles.info.container}>
      <ImageBackground source={profileImg} style={styles.info.profileImg} />
      <View style={styles.info.detail}>
        <Text style={styles.info.detailText}>유저 이름</Text>
        <View style={styles.info.authView}>
          <Text style={styles.info.detailText}>가입일자</Text>
          <Text style={styles.info.detailText}>인증 여부</Text>
        </View>
      </View>
      <View style={styles.info.content}>
        <Text style={styles.info.detailText}>{dummyInfo.name}</Text>
        <View style={styles.info.authView}>
          <Text style={styles.info.detailText}>{dummyInfo.date}</Text>
          <Text style={styles.info.detailText}>
            {dummyInfo.auth ? '인증' : '미인증'}
          </Text>
        </View>
      </View>
    </View>
  );

  // Gragde JSX: 등급 있는 그 칸
  const Grade = (
    <View style={styles.grade.container}>
      <View style={styles.grade.header}>
        <Text style={styles.grade.headerText}>등급</Text>
      </View>
      <View style={styles.grade.graph}></View>
      <View style={styles.grade.detail}>
        <View style={styles.grade.detailElem}>
          <Text style={styles.grade.detailElemTitle}>등급지수</Text>
          <Text style={styles.grade.detailElemContent}>
            {dummyInfo.emdrmqwltn}
          </Text>
        </View>
        <View style={styles.grade.detailElem}>
          <Text style={styles.grade.detailElemTitle}>응답률</Text>
          <Text style={styles.grade.detailElemContent}>
            {dummyInfo.dmdekqfbf}%
          </Text>
          <Text style={styles.grade.detailElemOption}>
            평균 {dummyInfo.e_response_time}분 안에 응답
          </Text>
        </View>
        <View style={styles.grade.detailElem}>
          <Text style={styles.grade.detailElemTitle}>재거래희망률</Text>
          <Text style={styles.grade.detailElemContent}>
            {dummyInfo.worjfogmlakdfbf}%
          </Text>
          <Text style={styles.grade.detailElemOption}>
            10명 중 {(dummyInfo.worjfogmlakdfbf / 10).toFixed(1)}명이 만족
          </Text>
        </View>
      </View>
    </View>
  );

  // History JSX: 거래내역 목록 버튼
  const History = (
    <View style={styles.history.container}>
      <Text style={styles.history.text}>거래내역 목록</Text>
    </View>
  );

  return (
    <>
      {Header}
      {Info}
      {Grade}
      {History}
    </>
  );
};

export default Profile;
