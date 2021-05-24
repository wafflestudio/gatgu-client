import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

import XSign from '@/assets/CrossSign';
import PlusSign from '@/assets/PlusSign';

import styles from './AddImage.style';

interface AddImageProps {
  images: (string | null | undefined)[];
  setImages: Dispatch<SetStateAction<(string | null | undefined)[]>>;
}

function AddImage({ images, setImages }: AddImageProps): JSX.Element {
  const [prev, setPrev] = useState<
    { mime: string; data: string | null | undefined }[]
  >([]);

  const pickImage = () => {
    const tempArrPrev: { mime: string; data: string | null | undefined }[] = [];
    const tempArrSend: (string | null | undefined)[] = [];
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((images) => {
        images.forEach((item) => {
          tempArrPrev.push({ mime: item.mime, data: item.data });
          tempArrSend.push(item.data);
        });
      })
      .then(() => {
        setPrev(tempArrPrev);
        setImages(tempArrSend);
      })
      .catch(() => {
        Alert.alert('갤러리를 여는데 실패했습니다...');
      });
  };

  const deleteImage = (key: number) => {
    const tempArrSend = images.filter((_, ind) => ind !== key);
    const tempArrPrev = prev.filter((_, ind) => ind !== key);
    setImages(tempArrSend);
    setPrev(tempArrPrev);
  };

  const previews =
    images[0] !== '' &&
    prev.map(
      (item, key): JSX.Element => (
        <View style={styles.photoContainer} key={key}>
          <Image
            style={styles.photo}
            source={{ uri: `data:${item.mime};base64,${item.data}` }}
          />
          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => deleteImage(key)}
          >
            <View style={styles.button}>
              <XSign />
            </View>
          </TouchableHighlight>
        </View>
      )
    );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <ScrollView horizontal scrollEnabled={true}>
          <TouchableHighlight onPress={() => pickImage()}>
            <View style={styles.plusSignCon}>
              <PlusSign style={styles.defaultPhoto} />
            </View>
          </TouchableHighlight>
          {images[0] !== '' && previews}
        </ScrollView>
      </View>
    </View>
  );
}

export default AddImage;
