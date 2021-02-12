import { View, Text } from 'react-native';
import styles from './Profile.Style';
import React from 'react';

// Gragde JSX: 등급 있는 그 칸
// TODO: API 확정되고 User Type 완성되면 any 치워야 됨
function Grade({ dummyInfo }: any): JSX.Element {
  return (
    <View style={styles.grade.container}>
      <View style={styles.grade.header}>
        <Text style={styles.grade.headerText}>등급</Text>
      </View>
      <View style={styles.grade.graph}>
        <View style={styles.grade.graphNumbers}>
          {[-100, 0, 100, 200, 300, 400, 500, 600].map((item, i) => (
            <Text key={i} style={styles.grade.graphNumber}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.grade.graphBoxes}>
          {['천민', '하수', '초수', '중수', '고수', '지존', '지름'].map(
            (item, i) =>
              i === dummyInfo.grade ? (
                <View key={i} style={styles.grade.pointBox}>
                  <View style={styles.grade.pointArrow} />
                  <Text style={styles.grade.pointBoxText}>{item}</Text>
                  <Text style={styles.grade.pointText}>내 등급</Text>
                </View>
              ) : (
                <View key={i} style={styles.grade.graphBox}>
                  <Text style={styles.grade.graphBoxText}>{item}</Text>
                </View>
              )
          )}
        </View>
      </View>
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
}

export default Grade;
