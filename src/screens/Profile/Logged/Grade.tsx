import { View, Text } from 'react-native';
import styles from './Grade.style';
import React from 'react';
import { IProfileProps } from '.';

// Gragde JSX: 등급 있는 그 칸
// TODO: API 확정되고 User Type 완성되면 any 치워야 됨
function Grade({ profile }: IProfileProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>등급</Text>
      </View>
      <View style={styles.graph}>
        <View style={styles.graphNumbers}>
          {[-100, 0, 100, 200, 300, 400, 500, 600].map((item, i) => (
            <Text key={i} style={styles.graphNumber}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.graphBoxes}>
          {['천민', '하수', '초수', '중수', '고수', '지존', '지름'].map(
            (item, i) =>
              i === profile.grade ? (
                <View key={i} style={styles.pointBox}>
                  <View style={styles.pointArrow} />
                  <Text style={styles.pointBoxText}>{item}</Text>
                  <Text style={styles.pointText}>내 등급</Text>
                </View>
              ) : (
                <View key={i} style={styles.graphBox}>
                  <Text style={styles.graphBoxText}>{item}</Text>
                </View>
              )
          )}
        </View>
      </View>
      <View style={styles.detail}>
        <View style={styles.detailElem}>
          <Text style={styles.detailElemTitle}>등급지수</Text>
          <Text style={styles.detailElemContent}>{profile.emdrmqwltn}</Text>
          <Text style={styles.detailElemOption}>중수까지 남았어요</Text>
        </View>
        <View style={styles.detailElem}>
          <Text style={styles.detailElemTitle}>응답률</Text>
          <Text style={styles.detailElemContent}>{profile.dmdekqfbf}%</Text>
          <Text style={styles.detailElemOption}>
            평균 {profile.e_response_time}분 안에 응답
          </Text>
        </View>
        <View style={styles.detailElem}>
          <Text style={styles.detailElemTitle}>재거래희망률</Text>
          <Text style={styles.detailElemContent}>
            {profile.worjfogmlakdfbf}%
          </Text>
          <Text style={styles.detailElemOption}>
            10명 중 {(profile.worjfogmlakdfbf / 10).toFixed(1)}명이 만족
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Grade;
