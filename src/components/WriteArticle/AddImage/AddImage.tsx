import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image as TImage } from 'react-native-image-crop-picker';

import _ from 'lodash';

import XSign from '@/assets/icons/CrossSign';
import PlusSign from '@/assets/icons/PlusSign';
import usePickImage from '@/helpers/hooks/usePickImage';
import { TShortImage } from '@/types/shared';

import styles from './AddImage.style';

interface AddImageProps {
  images: TShortImage[];
  setImages: Dispatch<SetStateAction<TShortImage[]>>;
  editable: boolean;
}

function AddImage({ images, setImages, editable }: AddImageProps): JSX.Element {
  const [loading, setLoading] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  const { pickMultipleImage } = usePickImage({
    width: 300,
    height: 400,
    cropping: true,
    multiple: true,
    includeBase64: true,
    mediaType: 'photo',
  });

  const pickImage = () => {
    const tempArrSend: TShortImage[] = _.cloneDeep(images);

    pickMultipleImage()
      .then((imgs) => {
        imgs &&
          imgs.forEach((item: TImage) => {
            tempArrSend.push({ mime: item.mime, path: item.path });
          });
      })
      .then(() => {
        setImages(tempArrSend);
      });
  };

  const deleteImage = (key: number) => {
    const tempArrSend = images.filter((_, ind) => ind !== key);
    setImages(tempArrSend);
  };

  const previews = useMemo(() => {
    return (
      images.length > 0 &&
      images.map(
        (item, key): JSX.Element => (
          <View
            style={
              loading[key]
                ? styles.loading
                : key == 0
                ? styles.thumbnailContainer
                : styles.photoContainer
            }
            key={key}
          >
            <Image
              style={
                !loading[key] && (key == 0 ? styles.thumbnail : styles.photo)
              }
              source={{ uri: item.path }}
              onLoadStart={() => {
                const prev = _.cloneDeep(loading);
                prev[key] = true;
                setLoading(prev);
              }}
              onLoadEnd={() => {
                const prev = _.cloneDeep(loading);
                prev[key] = false;
                setLoading(prev);
              }}
            />
            {loading[key] && <ActivityIndicator />}
            {!loading[key] && (
              <TouchableHighlight
                style={styles.buttonContainer}
                onPress={() => editable && deleteImage(key)}
              >
                <View style={styles.button}>
                  <XSign />
                </View>
              </TouchableHighlight>
            )}
          </View>
        )
      )
    );
  }, [images, editable]);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <ScrollView horizontal scrollEnabled={true}>
          <TouchableHighlight onPress={() => editable && pickImage()}>
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
