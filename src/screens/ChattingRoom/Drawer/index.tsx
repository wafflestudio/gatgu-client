import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, Alert } from 'react-native';

import {
  useIsDrawerOpen,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { Button, Profile } from '@/components';
import CheckBox from '@/components/CheckBox/CheckBox';
import { IChatUserProps, IUserSumProps } from '@/types/user';

import styles from './Drawer.style';

interface IDrawerTemplateProps {
  pictureUrls: string[];
  users: IChatUserProps[];
  // [x: string]: any;
}

function Drawer({ pictureUrls, users }: IDrawerTemplateProps): JSX.Element {
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
      <View style={styles.infoWrapper}>
        <View style={styles.checkBoxWrapper}>
          <CheckBox
            selected={user.pay_status}
            onPress={() => handleCheck()}
            size={20}
            iconSize={16}
          />
        </View>
        <View>
          <Text style={styles.priceText}>
            {user.wish_price.toLocaleString()}원
          </Text>
        </View>
      </View>
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
