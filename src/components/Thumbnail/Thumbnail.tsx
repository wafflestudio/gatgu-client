import React from 'react';

import { Image } from 'native-base';

import styles from './Thumbnail.style';

interface IThumbnailProps {
  uri: string;
}
function Thumbnail({ uri }: IThumbnailProps): JSX.Element {
  return (
    <Image
      source={
        uri
          ? {
              uri: uri,
            }
          : require('@/assets/images/defaultThumnail.png')
      }
      fallbackSource={require('@/assets/images/defaultThumnail.png')}
      loadingIndicatorSource={require('@/assets/images/defaultThumnail.png')}
      alt="thumnail"
      style={styles.thumbnail}
    />
  );
}

export default Thumbnail;
