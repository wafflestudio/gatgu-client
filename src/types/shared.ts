import { Image } from 'react-native-image-crop-picker';

export type TPageType = 'first' | 'next' | 'previous';

export interface ICursorPaginationResponse<T> {
  next: string;
  previous: string;
  results: T[];
}

export interface ImageDict {
  id: number;
  img_url: string;
}

export type TShortImage = Pick<Required<Image>, 'mime' | 'path'>;

export type DeepNonNullable<T extends Record<string, any>> = {
  [key in keyof T]-?: NonNullable<T[key]>;
};
