import React from 'react';
import { View, Text } from 'react-native';

import Open from '@/assets/ProfilePage/open.svg';
import Part from '@/assets/ProfilePage/participate.svg';
import { IUserDetail, IUserProps } from '@/types/user';

import styles from './Force.style';

interface ForceProps {
  profile: IUserDetail;
}

// Gragde JSX: 등급 있는 그 칸
function Force({ profile }: ForceProps): JSX.Element {
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
          <Open style={styles.bodyIcon} />
          <Text style={styles.bodyText}>모집횟수 {profile.hosted_count}회</Text>
        </View>
        <View style={styles.bodyElem}>
          <Part style={styles.bodyIcon} />
          <Text style={styles.bodyText}>
            참여횟수 {profile.participated_count}회
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Force;
