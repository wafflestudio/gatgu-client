import React from 'react';
import { Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { alignItems } from 'styled-system';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Header } from '@/components';
import { mobile } from '@/helpers/mobile';
import { RootState } from '@/store';

const ChattingRoomImages: React.FC = () => {
  const navigation = useNavigation();

  const images = useSelector((state: RootState) => state.chat.images);

  const handleBackButton = () => {
    navigation.goBack();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const renderPicure = ({ item: uri }: { item: string }) => (
    <Image
      source={{ uri }}
      style={{
        minWidth: mobile.width / 3 - 6,
        marginBottom: 9,
        marginRight: 9,
        minHeight: mobile.width / 3 - 6,
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="사진"
        left={<Header.BackButton />}
        leftCallback={handleBackButton}
      />
      <FlatList
        data={[...images].reverse()}
        renderItem={renderPicure}
        keyExtractor={(_, ind) => `${ind}`}
        numColumns={3}
      />
    </View>
  );
};

export default ChattingRoomImages;
