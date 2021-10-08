import React from 'react';
import { Modal, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';

import { palette } from '@/styles';

export interface GImageViewerProps {
  currentIndex: number;
  images: string[];
  isOpen?: boolean;
  isIndicatorShown?: boolean;
  onClose: () => void;
}

export const StyledImageViewerCloseButton = styled.TouchableHighlight`
  position: absolute;
  right: 10px;
  top: 0;
  margin-top: ${getStatusBarHeight()}px;
  font-size: 10px;
  z-index: 100;
`;

const GImageViewer: React.FC<GImageViewerProps> = ({
  currentIndex,
  images,
  isOpen,
  isIndicatorShown,
  onClose,
}) => {
  const imageViewerImages = images.map((image) => ({ url: image }));

  if (!isOpen) {
    return null;
  }

  return (
    <Modal transparent>
      <ImageViewer
        enableSwipeDown
        index={currentIndex}
        imageUrls={imageViewerImages}
        renderHeader={() => (
          <StyledImageViewerCloseButton onPress={onClose}>
            <Icon name="close" size={36} color={palette.gray} />
          </StyledImageViewerCloseButton>
        )}
        renderIndicator={isIndicatorShown ? () => <View /> : undefined}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default GImageViewer;
