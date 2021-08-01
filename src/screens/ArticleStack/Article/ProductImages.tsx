import React, { useState } from 'react';
import { View, Modal, Pressable } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'native-base';
import styled from 'styled-components/native';

import { ArticleStatus } from '@/enums';
import { palette } from '@/styles';
import { IArticleStatus } from '@/types/article';
import { ImageDict } from '@/types/shared';

import styles from './ProductImages.style';

interface IArticleChat {
  image_urls: ImageDict[];
  articleStatus: IArticleStatus;
}

const StyledImageViewerCloseButton = styled.TouchableHighlight`
  position: absolute;
  right: 10px;
  top: 0;
  margin-top: ${getStatusBarHeight()}px;
  font-size: 10px;
  z-index: 100;
`;

const StyledImage = styled(Image)<{ isEnd?: boolean }>`
  opacity: ${(props) => (props.isEnd ? 0.3 : 1)};
`;

function ProductImages({
  image_urls,
  articleStatus,
}: IArticleChat): JSX.Element {
  const [isImageViewerOpen, setImageViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isArticleStatusAboveComplete =
    articleStatus.progress_status >= ArticleStatus.Complete;

  const dot = <View style={styles.dot} />;
  const isOpenImageViewerPossible = image_urls.length > 0;

  const imageViewerImages = image_urls.map((image) => {
    return {
      url: image.img_url,
    };
  });

  const images =
    image_urls.length == 0 ? (
      <StyledImage
        alt="article_img"
        h={283}
        isEnd={isArticleStatusAboveComplete}
        source={require('@/assets/images/no-image.png')}
      />
    ) : (
      image_urls.map((item, idx) => (
        <Pressable
          key={idx}
          onPress={() => {
            isOpenImageViewerPossible && setImageViewerOpen(true);
          }}
        >
          <StyledImage
            alt="article_img"
            h={283}
            isEnd={isArticleStatusAboveComplete}
            style={styles.image}
            source={{ uri: item.img_url }}
            fallbackSource={require('@/assets/images/defaultThumnail.png')}
          />
        </Pressable>
      ))
    );

  return (
    <View>
      <Swiper
        index={currentIndex}
        style={styles.swiper}
        loop={false}
        activeDotColor={palette.white}
        dot={dot}
        paginationStyle={styles.pageStyle}
        onIndexChanged={setCurrentIndex}
      >
        {images}
      </Swiper>
      {isImageViewerOpen ? (
        <Modal transparent>
          <ImageViewer
            enableSwipeDown
            index={currentIndex}
            imageUrls={imageViewerImages}
            renderHeader={() => (
              <StyledImageViewerCloseButton
                onPress={() => setImageViewerOpen(false)}
              >
                <Icon name="close" size={36} color={palette.gray} />
              </StyledImageViewerCloseButton>
            )}
            onCancel={() => setImageViewerOpen(false)}
          />
        </Modal>
      ) : null}
    </View>
  );
}
export default ProductImages;
