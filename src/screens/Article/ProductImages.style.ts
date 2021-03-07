import { palette } from '@/styles';
import { StyleSheet } from 'react-native';

const ProductImagesStyles = StyleSheet.create({
  swiper: {
    height: 283,
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
