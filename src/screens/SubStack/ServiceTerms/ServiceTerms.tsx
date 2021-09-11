import React from 'react';

import styled from 'styled-components/native';

import { palette } from '@/styles';

const StyledServiceTerms = styled.ScrollView`
  background-color: ${palette.white};
  padding: 16px 12px;
`;

const ServiceTerms: React.FC = () => {
  return <StyledServiceTerms></StyledServiceTerms>;
};

export default ServiceTerms;
