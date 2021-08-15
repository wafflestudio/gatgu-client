import React from 'react';

import styled from 'styled-components/native';

import BackIcon from '@/assets/icons/BackIcon/BackIcon.svg';

const StyledHeaderLeft = styled.View`
  width: 38px;
  align-items: center;
`;

const HeaderBackButton: React.FC = () => {
  return (
    <StyledHeaderLeft>
      <BackIcon />
    </StyledHeaderLeft>
  );
};

export default HeaderBackButton;
