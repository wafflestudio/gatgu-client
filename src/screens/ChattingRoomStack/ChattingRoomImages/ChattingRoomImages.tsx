import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Header } from '@/components';
import GImageViewer from '@/components/Gatgu/GImageViewer/GImageViewer';
import { mobile } from '@/helpers/mobile';
import { RootState } from '@/store';

const ChattingRoomImages: React.FC = () => {
  const navigation = useNavigation();

  const images = useSelector((state: RootState) => state.chat.images);

  const [isImageViewOpen, setImageViewOpen] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleBackButton = () => {
    navigation.goBack();
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const renderPicure = ({
    item: uri,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <TouchableOpacity
      onPress={() => {
        setImageViewOpen(true);
        setCurrentImageIndex(index);
      }}
    >
      <Image
        source={{ uri }}
        style={{
          minWidth: mobile.width / 3 - 6,
          marginBottom: 9,
          marginRight: 9,
          minHeight: mobile.width / 3 - 6,
        }}
      />
    </TouchableOpacity>
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

      <GImageViewer
        isOpen={isImageViewOpen}
        images={images}
        currentIndex={currentImageIndex}
        onClose={() => {
          setImageViewOpen(false);
        }}
      />
    </View>
  );
};

export default ChattingRoomImages;
