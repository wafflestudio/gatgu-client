import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';

import { articleAPI } from '@/apis';
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

  const getBlob = async (file: any) => {
    const resp = await fetch(file);
    const imageBody = await resp.blob();
    return imageBody;
  };
  const uploadImage = async (url: string, body: any) => {
    const response = await fetch(url, {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'image/*',
      },
    });
    if (response.status !== 200) console.log(response);
    else console.log('GOOD');
  };
  const uploadImageForm = async (url: string, body: any) => {
    const response = await fetch(url, {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'multidata/form-data',
      },
    });
    if (response.status !== 200) console.log(response);
    else console.log('GOOD');
  };
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
    }).then((imgs) => {
      imgs.forEach((img) => {
        articleAPI.putPresignedURL(91, 'image').then((res) => {
          // Get presigned url and file_name
          const url = res.data.presigned_url;
          const fname = res.data.file_name;

          // 1. Get blob (using local URL of image) and then post to url with this blob
          // 참고: https://codedaily.io/tutorials/Upload-a-File-to-an-S3-Pre-Signed-URL-with-React-Native
          /*
              {"_data": 
                {"__collector": {}, 
                "blobId": "7141D396-F00E-421A-9710-1497E2C8073F", 
                "name": "IMG_0002.JPG", 
                "offset": 0, 
                "size": 2604768, 
                "type": "image/jpeg"}
              }
            */
          getBlob(img.sourceURL).then((res) => {
            console.log('res using sourceURL: ', res);
            uploadImage(url, res).then((ress) => {
              console.log(ress);
            });
          });

          // 1-2. Maybe URL isn't URI... try with data (the long string)
          getBlob(img.data).then((res) => {
            console.log('res using data: ', res);
            uploadImage(url, res).then((ress) => {
              console.log(ress);
            });
          });
          // try with source uri(that works for displaying image)
          getBlob(`data:${img.mime};base64,${img.data}`).then((res) => {
            console.log('res using data: ', res);
            uploadImage(url, res).then((ress) => {
              console.log(ress);
            });
          });

          // 2. Try with formdata
          // 참고: https://velog.io/@everydamnday/%EB%A9%80%ED%8B%B0%ED%8C%8C%ED%8A%B8-%ED%8F%BC%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%97%85%EB%A1%9C%EB%93%9C-in-React-nativewith-image-crop-picker-AWS-S3
          const imageForm = new FormData();
          const photo = {
            uri: img.sourceURL,
            type: 'image/jpeg',
            name: 'photo.jpg',
          };
          getBlob(img.sourceURL).then((res) => {
            console.log('res using formdata: ', res);
            imageForm.append('image', res);
            uploadImageForm(url, imageForm).then((ress) => {
              console.log(ress);
            });
          });
        });
      });

      //////////////////////////////////////////
      imgs.forEach((item) => {
        tempArrPrev.push({ mime: item.mime, data: item.data });
        tempArrSend.push(item.data);
      });
    });
    // .then(() => {
    //   setPrev(tempArrPrev);
    //   setImages(tempArrSend);
    // })
    // .catch(() => {
    //   Alert.alert('갤러리를 여는데 실패했습니다...');
    // });
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
