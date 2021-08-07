import React from 'react';
import { ButtonProps, ViewStyle } from 'react-native';

import { Progress } from 'native-base';

import { GText, GTextProps } from '../GText';
import { StyledButtonWrapper } from './GButton.styled';

export type GButtonWidth = 'default' | 'full';
export type GButtonSize = 'small' | 'default' | 'large';
export type GButtonVariant = 'filled' | 'outlined';
export type GButtonTheme = 'primary';

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
      return <Progress />;
    }

    return (
      <GText
        size="huge"
        {...buttonInnerTextProps[theme][variant]}
        {...textProps}
      >
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
