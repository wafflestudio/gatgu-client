// 색과 font 정보는 여기서 정의

const theme = {
  palette: {
    dark: '#000',
    gray: '#8D8D8D',
    white: 'white',
    whiteGray: '#F0F0F0',
    borderGray: '#C9C9C9',
    yellow: '#FFDC48',
    blue: '#114093',
  },
  typo: {
    bigTitle: {
      fontFamily: 'NotoSansKR_700Bold', // can't find NotoSansCJKkr-Medium
      lineHeight: 27,
      fontSize: 18,
    },
    semiTitle: {
      fontFamily: 'NotoSansKR_400Regular',
      lineHeight: 22,
      fontSize: 15,
    },
    info: {
      fontFamily: 'NotoSansKR_400Regular',
      lineHeight: 19,
      fontSize: 13,
    },
  },
};

export const { palette, typo } = theme;
