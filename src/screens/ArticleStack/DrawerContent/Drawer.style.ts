import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import { GText } from '@/components/Gatgu';
import { palette, typo } from '@/styles';

export const StyledArticleDrawerMenuText = styled(GText)`
  margin-bottom: 16px;
`;

const DrawerStyles = StyleSheet.create({
  upperContainer: {
    paddingLeft: '12.6%',
    paddingBottom: '14.1%',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderGray,
  },

  lowerContainer: {
    paddingLeft: '12.6%',
    paddingBottom: '14.1%',
  },

  upperLabelText: {
    ...typo.bigInfo,
    paddingTop: 5,
    color: palette.dark,
  },

  lowerLabelText: {
    paddingTop: '9%',
    paddingBottom: '9%',
    ...typo.bigTitle,
    fontWeight: 'bold',
    color: palette.dark,
  },

  image: {
    width: 30,
    height: 30,
  },
});

export default DrawerStyles;
