import ImagePicker from 'react-native-image-crop-picker';

const usePickImage = (options?: Record<string, unknown>) => {
  const pickSingleImage = () =>
    ImagePicker.openPicker({
      ...options,
      multiple: false,
    });
  const pickMultipleImage = () =>
    ImagePicker.openPicker({
      ...options,
      multiple: true,
    });
  return { pickSingleImage, pickMultipleImage };
};

export default usePickImage;
