import styled, { css } from 'styled-components/native';

import { palette } from '@/styles';
import { DeepNonNullable } from '@/types/shared';

import { GTextProps, GTextSizes } from './GText';

type PickedTextProps = DeepNonNullable<Pick<GTextProps, 'color' | 'size'>> &
  Pick<GTextProps, 'bold' | 'textDecorationLine'>;

const cssTextSizes: Record<GTextSizes, any> = {
  tiny: css`
    font-size: 10px;
  `,
  small: css`
    font-size: 12px;
  `,
  default: css`
    font-size: 13px;
  `,
  big: css`
    font-size: 15px;
  `,
  huge: css`
    font-size: 18px;
  `,
};

export const StyledText = styled.Text<PickedTextProps>`
  ${(props) => cssTextSizes[props.size]};

  color: ${(props) =>
    props.color === 'inherit' ? 'inherit' : palette[props.color]};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  text-decoration-line: ${(props) => props.textDecorationLine ?? 'none'};
`;
