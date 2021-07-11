import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const usePickImage = (options: Record<string, unknown>) => {
  const pickSingleImage = ImagePicker.openPicker({
    ...options,
    multiple: false,
  }).catch(() => {
    Alert.alert('갤러리를 여는데 실패했습니다...');
  });
  const pickMultipleImage = ImagePicker.openPicker({
    ...options,
    multiple: true,
  }).catch(() => {
    Alert.alert('갤러리를 여는데 실패했습니다...');
  });
  return { pickSingleImage, pickMultipleImage };
};

export default usePickImage;
