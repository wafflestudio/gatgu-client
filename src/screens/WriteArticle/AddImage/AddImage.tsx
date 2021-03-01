import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';
import styles from './AddImage.style';
import PlusSign from '@/assets/PlusSign';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';
import XSign from '@/assets/CrossSign';

interface AddImageProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string | null | undefined>[]>;
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
          console.log(item.data?.substring(0, 20));
          tempArrPrev.push({ mime: item.mime, data: item.data });
          tempArrSend.push(item.data);
        });
      })
      .then(() => {
        setPrev(tempArrPrev);
        setImages(tempArrSend);
      })
      .catch(() => {
        console.log('Error...');
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
          {console.log(previews)}
          {images[0] !== '' && previews}
        </ScrollView>
      </View>
    </View>
  );
}

export default AddImage;
