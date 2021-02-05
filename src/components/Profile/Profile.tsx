import { View, Text } from 'react-native';
import styles from './Profile.Style';
import React from 'react';

const Profile = () => {
  return (
    <>
      <View style={styles.header.container}>
        <Text>Hi</Text>
      </View>
      <View style={styles.info.container}>
        <Text>Hi</Text>
      </View>
      <View style={styles.grade.container}>
        <Text>Hi</Text>
      </View>
      <View style={styles.history.container}>
        <Text style={styles.history.text}>거래내역 목록</Text>
      </View>
    </>
  );
};

export default Profile;
