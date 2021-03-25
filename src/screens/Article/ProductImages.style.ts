import { palette, typo } from '@/styles';
import { StyleSheet } from 'react-native';

const ProductImagesStyles = StyleSheet.create({
  swiper: {
    height: 283,
  },

  completeCover: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  completeTextContainer: {
    backgroundColor: palette.gray,
    position: 'absolute',
    top: '49%',
    left: '45%',
    borderWidth: 1,
    borderColor: palette.gray,
    padding: 1,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 7.5,
  },

  completeText: {
    color: palette.white,
    ...typo.info,
  },

  image: {
    width: '100%',
    height: 283,
  },

  dot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    opacity: 100,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },

  pageStyle: {
    bottom: '3.5%',
  },
});

export default ProductImagesStyles;
