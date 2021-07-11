import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker, { Image as TImage } from 'react-native-image-crop-picker';

import XSign from '@/assets/icons/CrossSign';
import PlusSign from '@/assets/icons/PlusSign';
import usePickImage from '@/helpers/hooks/usePickImage';

import styles from './AddImage.style';

type TShortImage = Pick<Required<TImage>, 'mime' | 'path'>;
interface AddImageProps {
  images: TShortImage[];
  setImages: Dispatch<SetStateAction<TShortImage[]>>;
}

function AddImage({ images, setImages }: AddImageProps): JSX.Element {
  const [prev, setPrev] = useState<TShortImage[]>([]);

  const { pickMultipleImage } = usePickImage({
    width: 300,
    height: 400,
    cropping: true,
    multiple: true,
    includeBase64: true,
    mediaType: 'photo',
  });

  const pickImage = () => {
    const tempArrPrev: TShortImage[] = [];
    const tempArrSend: TShortImage[] = [];

    pickMultipleImage()
      .then((imgs) => {
        imgs &&
          imgs.forEach((item: TImage) => {
            tempArrPrev.push({ mime: item.mime, path: item.path });
            tempArrSend.push({ mime: item.mime, path: item.path });
          });
      })
      .then(() => {
        setPrev(tempArrPrev);
        setImages(tempArrSend);
      });
  };

  const deleteImage = (key: number) => {
    const tempArrSend = images.filter((_, ind) => ind !== key);
    const tempArrPrev = prev.filter((_, ind) => ind !== key);
    setImages(tempArrSend);
    setPrev(tempArrPrev);
  };

  const previews =
    images.length > 0 &&
    prev.map(
      (item, key): JSX.Element => (
        <View style={styles.photoContainer} key={key}>
          <Image style={styles.photo} source={{ uri: item.path }} />
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
          <TouchableHighlight onPress={pickImage}>
            <View style={styles.plusSignCon}>
              <PlusSign style={styles.defaultPhoto} />
            </View>
          </TouchableHighlight>
          {images.length > 0 && previews}
        </ScrollView>
      </View>
    </View>
  );
}

export default AddImage;
