import React from 'react';
import { TextProps, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { palette } from '@/styles';

import { StyledText } from './GText.styled';

export type GTextSizes = 11 | 12 | 13 | 14 | 15 | 16 | 18 | 22;
export type GTextColors = keyof typeof palette;

export interface GTextProps extends TextProps {
  size?: GTextSizes;
  color?: GTextColors;
  bold?: boolean;
  touchable?: boolean;
  textAlign?: TextStyle['textAlign'];
  textDecorationLine?: TextStyle['textDecorationLine'];
}

const GText: React.FC<GTextProps> = ({
  children,
  touchable,
  textDecorationLine,
  bold,
  size = 13,
  color = 'dark',
  textAlign,
  onPress,
  ...textProps
}) => {
  const renderText = () => {
    return (
      <StyledText
        size={size}
        color={color}
        bold={bold}
        textDecorationLine={textDecorationLine}
        textAlign={textAlign}
        {...textProps}
      >
        {children}
      </StyledText>
    );
  };

  if (touchable) {
    return (
      <TouchableOpacity onPress={onPress}>{renderText()}</TouchableOpacity>
    );
  }

  return renderText();
};

export default GText;
