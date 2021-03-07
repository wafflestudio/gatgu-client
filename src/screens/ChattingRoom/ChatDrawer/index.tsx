import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';

import { Button } from '@/components';

import styles from './DrawerTemplate.style';

interface IDrawerTemplateProps {
  pictureUrls: string[];
}

function ChatDrawer({ pictureUrls }: IDrawerTemplateProps): JSX.Element {
  const navigation = useNavigation();
  const isDrawerOpen = useIsDrawerOpen();

  const [participants, setParticipants] = useState<JSX.Element[]>([]);

  useEffect(() => {
    navigation.setOptions({ headerShown: !isDrawerOpen });
  }, [navigation, isDrawerOpen]);

  const renderPicure = ({ item: uri }: { item: string }) => (
    <Image source={{ uri }} />
  );

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
        {participants}
      </View>
      <View style={styles.optionContainer}>
        <Button
          title="나가기"
          onPress={() => alert('not yet: 나가기')}
          textStyle={styles.smallLabelText}
        />
      </View>
    </View>
  );
}

export default ChatDrawer;
