import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';

import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { Button, Profile } from '@/components';
import CheckBox from '@/components/CheckBox';
import { IChatUserProps, IUserSumProps } from '@/types/user';

import styles from './Drawer.style';

interface IDrawerTemplateProps {
  pictureUrls: string[];
  users: IChatUserProps[];
}

function Drawer({ pictureUrls, users }: IDrawerTemplateProps): JSX.Element {
  const navigation = useNavigation();
  const isDrawerOpen = useIsDrawerOpen();

  useEffect(() => {
    navigation.setOptions({ headerShown: !isDrawerOpen });
  }, [navigation, isDrawerOpen]);

  const renderPicure = ({ item: uri }: { item: string }) => (
    <Image source={{ uri }} style={styles.image} />
  );

  const handleCheck = () => {
    console.log('handle check not yet');
  };

  const renderedParticipants = users.map((user, ind) => (
    <View key={ind} style={styles.profileBox}>
      <Profile
        profile_id={user.participant.profile_id}
        picture={user.participant.picture}
        nickname={user.participant.nickname}
      />
      <CheckBox
        value={user.pay_status}
        onPress={() => handleCheck()}
        icon="checkcircle"
        iconSize={30}
        iconColor={'black'}
      />
    </View>
  ));

  return (
    <View style={styles.drawerInnerWrapper}>
      <View style={styles.pictureContainer}>
        <Text style={styles.bigLabelText}>사진</Text>
        <FlatList
          data={pictureUrls}
          renderItem={renderPicure}
          keyExtractor={(_, ind) => `${ind}`}
          horizontal={true}
        />
      </View>
      <View style={styles.userContainer}>
        <Text style={styles.bigLabelText}>참여 인원 목록</Text>
        {renderedParticipants}
      </View>
      <View style={styles.optionContainer}>
        <Button
          title="나가기"
          onPress={() => Alert.alert('not yet: 나가기')}
          textStyle={styles.smallLabelText}
        />
      </View>
    </View>
  );
}

export default Drawer;
