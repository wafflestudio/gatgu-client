import styled, { css } from 'styled-components/native';

import { palette } from '@/styles';
import { DeepNonNullable } from '@/types/shared';

import {
  GButtonSize,
  GButtonWidth,
  GButtonProps,
  GButtonTheme,
  GButtonVariant,
} from './GButton';

type PickedGButtonProps = DeepNonNullable<
  Pick<GButtonProps, 'width' | 'size' | 'theme' | 'variant'>
> &
  Pick<GButtonProps, 'disabled'>;

const cssButtonSizes: Record<GButtonSize, any> = {
  small: css`
    border-radius: 14;
  `,
  default: css`
    border-radius: 11;
  `,
  large: css`
    border-radius: 11;
  `,
};

const cssButtonSizesWidth: Record<GButtonSize, Record<GButtonWidth, any>> = {
  small: {
    default: css`
      min-width: 66px;
      height: 32px;
    `,
    full: css`
      height: 32px;
      width: 100%;
    `,
  },
  default: {
    default: css`
      min-width: 120px;
      height: 38px;
    `,
    full: css`
      height: 38px;
      width: 100%;
    `,
  },
  large: {
    default: css`
      min-width: 146px;
      height: 46px;
    `,
    full: css`
      height: 46px;
      width: 100%;
    `,
  },
};

const cssButtonThemes: Record<GButtonTheme, Record<GButtonVariant, any>> = {
  primary: {
    filled: css`
      background-color: ${palette.blue};
      border: 1px solid ${palette.blue};
    `,
    outlined: css`
      background-color: ${palette.white};
      border: 1px solid ${palette.blue};
    `,
  },
};

export const StyledButtonWrapper = styled.TouchableOpacity<PickedGButtonProps>`
  ${(props) => cssButtonThemes[props.theme as GButtonTheme][props.variant]};
  ${(props) => cssButtonSizesWidth[props.size][props.width]};
  ${(props) => cssButtonSizes[props.size]};

  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
