import React from 'react';
import { ActivityIndicator, ButtonProps, ViewStyle } from 'react-native';

import { palette } from '@/styles';

import { GText, GTextProps } from '../GText';
import { StyledButtonWrapper } from './GButton.styled';

export type GButtonWidth = 'default' | 'full' | 'fit';
export type GButtonSize = 'small' | 'default' | 'large';
export type GButtonVariant = 'filled' | 'outlined';
export type GButtonTheme = 'primary' | 'gray' | 'yellow';

type OmittedButtonProps = Omit<ButtonProps, 'theme' | 'title'>;

export interface GButtonProps extends OmittedButtonProps {
  width?: GButtonWidth;
  size?: GButtonSize;
  variant?: GButtonVariant;
  theme?: GButtonTheme;
  textProps?: GTextProps;
  style?: ViewStyle;
  isLoading?: boolean;
}

export const buttonInnerTextProps: Record<
  GButtonTheme,
  Record<GButtonVariant, GTextProps>
> = {
  primary: {
    filled: {
      color: 'white',
    },
    outlined: {
      color: 'blue',
    },
  },
  gray: {
    filled: {
      color: 'white',
    },
    outlined: {
      color: 'gray',
    },
  },
  yellow: {
    filled: {
      color: 'white',
    },
    outlined: {
      color: 'yellow',
    },
  },
};

const GButton: React.FC<GButtonProps> = ({
  children,
  width = 'default',
  size = 'default',
  theme = 'primary',
  variant = 'filled',
  isLoading,
  style,
  disabled,
  textProps,
  ...buttonProps
}) => {
  const renderButtonInner = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          color={palette[buttonInnerTextProps[theme][variant].color ?? 'white']}
        />
      );
    }

    return (
      <GText size={18} {...buttonInnerTextProps[theme][variant]} {...textProps}>
        {children}
      </GText>
    );
  };

  return (
    <StyledButtonWrapper
      width={width}
      size={size}
      theme={theme}
      variant={variant}
      disabled={disabled}
      style={style}
      {...buttonProps}
    >
      {renderButtonInner()}
    </StyledButtonWrapper>
  );
};

export default GButton;
