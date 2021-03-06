import { View, Text } from 'react-native';
import styles from './Grade.style';
import React, { useCallback } from 'react';
import GradeBar from '@/assets/ProfilePage/GradeBar.svg';

// Gragde JSX: 등급 있는 그 칸
function Grade(): JSX.Element {
  const getPosition = useCallback(() => {
    // FIXME: proper 수식
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>등급</Text>
      </View>
      <View style={styles.graph}>
        <View style={styles.graphNumbers}>
          {Array(11)
            .fill(0)
            .map((_, i) => (
              <Text key={i} style={styles.graphNumber}>
                {i * 10}
              </Text>
            ))}
        </View>
        <View style={styles.graphBoxes}>
          <GradeBar style={{ width: 323 }} />
        </View>
      </View>
      <View style={styles.grade}>
        {['샘물', '흐르는물', '고인물', '해골물'].map((item, i) => (
          <View style={styles.bodyElem} key={i}>
            <View style={styles.bodyCircle} />
            <Text style={styles.bodyText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Grade;
