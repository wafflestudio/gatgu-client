import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { IUserDetail } from '@/types/user';

import styles from './Force.style';

type ForceProps = Pick<IUserDetail, 'hosted_count' | 'participated_count'>;

// Gragde JSX: 등급 있는 그 칸
function Force({ hosted_count, participated_count }: ForceProps): JSX.Element {
  /*
  FIXME: @woohm402
    todo: 현재 버전에서는 일단 없는 함수입니다
    when: grade 추가되면
    
  const getGrade = useMemo(() => {
    // FIXME: @woohm402
    //   todo: get param and return grade in string
    //   when: grade 추가될 때 구현할게요
  }, [grade]);
  */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>추진력</Text>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.bodyElem}>
          <Ionicons name="add-circle-outline" size={18} />
          <Text style={styles.bodyText}>
            &nbsp;모집횟수&nbsp;
            <Text style={{ fontWeight: 'bold' }}>{hosted_count}</Text>회
          </Text>
        </View>
        <View style={styles.bodyElem}>
          <Ionicons name="chatbubble-outline" size={18} />
          <Text style={styles.bodyText}>
            &nbsp;참여횟수&nbsp;
            <Text style={{ fontWeight: 'bold' }}>{participated_count}</Text>회
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Force;
