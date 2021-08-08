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
    height: 32px;
    border-radius: 14px;
    padding: 0px 12px;
  `,
  default: css`
    height: 38px;
    border-radius: 11px;
    padding: 0px 17px;
  `,
  large: css`
    border-radius: 11px;
    height: 46px;
    padding: 0px 17px;
  `,
};

const cssButtonWidths: Record<GButtonSize, Record<GButtonWidth, any>> = {
  small: {
    default: css`
      min-width: 66px;
    `,
    full: css`
      width: 100%;
    `,
  },
  default: {
    default: css`
      min-width: 120px;
    `,
    full: css`
      width: 100%;
    `,
  },
  large: {
    default: css`
      min-width: 146px;
    `,
    full: css`
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
  gray: {
    filled: css`
      background-color: ${palette.gray};
      border: 1px solid ${palette.gray};
    `,
    outlined: css`
      background-color: ${palette.white};
      border: 1px solid ${palette.gray};
    `,
  },
};

export const StyledButtonWrapper = styled.TouchableOpacity<PickedGButtonProps>`
  ${(props) => cssButtonThemes[props.theme as GButtonTheme][props.variant]};
  ${(props) => cssButtonWidths[props.size][props.width]};
  ${(props) => cssButtonSizes[props.size]};

  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;
