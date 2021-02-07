import React from 'react';
import { Thumbnail } from 'native-base';

interface IUriProps {
  uri: string;
  flex?: number; // 상대적 크기
  mg?: number | string;
  [x: string]: any; // ...rest 타입을 위해서
}

// thumnail custom
export default function CustomThumbnail({
  uri,
  flex = 1,
  mg: margin = 1,
  ...rest
}: IUriProps) {
  return (
    <Thumbnail
      source={{ uri }}
      style={{ flex, margin, height: '100%' }}
      {...rest}
    />
  );
}
