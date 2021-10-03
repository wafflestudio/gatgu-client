import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import styled from 'styled-components/native';

type GIconButtonSize = 'default';
interface GIconButtonProps extends TouchableOpacityProps {
  size?: GIconButtonSize;
}

const StyledTouchableOpacity = styled.TouchableOpacity<GIconButtonProps>`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GIconButton: React.FC<GIconButtonProps> = ({
  children,
  size = 'default',
}) => {
  return (
    <StyledTouchableOpacity size={size}>{children}</StyledTouchableOpacity>
  );
};

export default GIconButton;
