import { View, Text } from 'react-native';
import styles from './Force.style';
import React, { useMemo } from 'react';
import Part from '@/assets/ProfilePage/participate.svg';
import Open from '@/assets/ProfilePage/open.svg';

// Gragde JSX: 등급 있는 그 칸
function Force(): JSX.Element {
  const getGrade = useMemo(() => {
    // FIXME: get param and return grade in string
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>추진력</Text>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.bodyElem}>
          <Open style={styles.bodyIcon} />
          <Text style={styles.bodyText}>모집횟수 1회</Text>
        </View>
        <View style={styles.bodyElem}>
          <Part style={styles.bodyIcon} />
          <Text style={styles.bodyText}>참여횟수 3회</Text>
        </View>
      </View>
    </View>
  );
}

export default Force;
