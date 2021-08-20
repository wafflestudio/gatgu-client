import styled from 'styled-components/native';

import { palette } from '@/styles';
import { DeepNonNullable } from '@/types/shared';

import { GTextProps } from './GText';

type PickedTextProps = DeepNonNullable<Pick<GTextProps, 'color' | 'size'>> &
  Pick<GTextProps, 'bold' | 'textDecorationLine' | 'textAlign'>;

export const StyledText = styled.Text<PickedTextProps>`
  color: ${(props) => palette[props.color]};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  text-decoration-line: ${(props) => props.textDecorationLine ?? 'none'};
  text-align: ${(props) => props.textAlign || 'auto'};
`;
