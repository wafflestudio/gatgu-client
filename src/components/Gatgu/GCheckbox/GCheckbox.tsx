import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';

import { palette } from '@/styles';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
}

const StyledGCheckbox = styled.TouchableOpacity<Pick<CheckBoxProps, 'checked'>>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => (p.checked ? palette.blue : palette.white)};
`;

function GCheckBox({ checked, onPress }: CheckBoxProps): JSX.Element {
  return (
    <StyledGCheckbox checked={checked} onPress={onPress}>
      <Icon name="done" color={checked ? 'white' : palette.gray} />
    </StyledGCheckbox>
  );
}

export default GCheckBox;
