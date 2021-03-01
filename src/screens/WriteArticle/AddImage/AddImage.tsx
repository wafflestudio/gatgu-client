import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, TouchableHighlight, Text } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import styles from './AddImage.style';
import PlusSign from '@/assets/PlusSign';
import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import XSign from '@/assets/CrossSign';

interface AddImageProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string | null | undefined>[]>;
}

// TODO:
// - modify to adding multiple images (using image-crop-picker) after ejection

function AddImage({ images, setImages }: AddImageProps): JSX.Element {
  const [prev, setPrev] = useState<
    { mime: string; data: string | null | undefined }[]
  >([]);
  // const pickImage = async () => {
  //   // Get permission to access photo gallery
  //   async () => {
  //     // confirm that the platform is on ios or android
  //     if (Platform.OS !== 'web') {
  //       // asynchronously ask for permission, receive status (whether granted permission or not)
  //       // status can either be 'granted', 'undetermined' or 'denied
  //       const {
  //         status,
  //       } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Sorry, we need camera roll permissions to make this work!');
  //       }
  //     }
  //   };
  //   // show window to select photo from gallery
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All, // which type of media that can be picked (in this case, images and videos)
  //     allowsEditing: true, // whether we can crop the image, trim the video
  //     aspect: [4, 3], // aspect ratio that is kept when editing
  //     quality: 1, // maximum quality of compression
  //   });

  //   // if user didn't cancel while picking an image, set state to the picked image's uri
  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  //   // else do nothing
  // };

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

/*<ScrollView horizontal contentContainerStyle={styles.container} scrollEnabled={true}>
        <TouchableHighlight onPress={() => pickImage()}>
          <View style={styles.plusSignCon}>
            <PlusSign style={styles.defaultPhoto} />
          </View>
        </TouchableHighlight>
        {/* {console.log(previews)} }
        {images[0] !== '' && previews}
        {/* <Text style={{marginRight: 10, paddingRight: 30, backgroundColor: 'blue', height: 100}}>Hello1</Text>
        <Text style={{marginRight: 10, paddingRight: 30, backgroundColor: 'blue'}}>Hello2</Text>
        <Text style={{marginRight: 10, paddingRight: 30, backgroundColor: 'blue'}}>Hello3</Text>
        <Text style={{marginRight: 10, paddingRight: 30, backgroundColor: 'blue'}}>Hello4</Text>
        <Text style={{marginRight: 10, paddingRight: 30, backgroundColor: 'blue'}}>Hello5</Text>
        <Text style={{marginRight: 10, paddingRight: 30, backgroundColor: 'blue'}}>Hello6</Text> }
      </ScrollView>*/
