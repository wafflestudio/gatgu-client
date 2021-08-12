import React from 'react';

import { IInputProps, Input } from 'native-base';

import { palette } from '@/styles';

import { gInputStyles } from './GInput.styled';

export type GInputWidth = 'default' | 'full';
export type GInputSize = 'default';
export type GInputTheme = 'white' | 'gray';

type OmittedInputProps = Omit<IInputProps, 'width' | 'size'>;

export interface GInputProps extends OmittedInputProps {
  width?: GInputWidth;
  size?: GInputSize;
  theme?: GInputTheme;
}

const gInputThemes: Record<GInputTheme, keyof typeof palette> = {
  white: 'white',
  gray: 'whiteGray',
};

const gInputHeight: Record<GInputSize, string> = {
  default: '45px',
};

const GInput: React.FC<GInputProps> = ({
  theme = 'white',
  width = 'default',
  size = 'default',
  variant = 'filled',
  ...inputProps
}) => {
  return (
    <Input
      isFullWidth={width === 'full'}
      _focus={gInputStyles._focus}
      height={gInputHeight[size]}
      backgroundColor={palette[gInputThemes[theme]]}
      variant={variant}
      {...inputProps}
    />
  );
};

export default GInput;