import React from 'react';
import { Thumbnail } from 'native-base';

interface IUriProps {
  uri: string;
  w: number | string;
  h: number | string;
  [x: string]: any; // ...rest 타입을 위해서
}

// thumnail custom
function CustomThumbnail({
  uri,
  w: width,
  h: height,
  ...rest
}: IUriProps): JSX.Element {
  return <Thumbnail source={{ uri }} style={{ width, height }} {...rest} />;
}

export default CustomThumbnail;