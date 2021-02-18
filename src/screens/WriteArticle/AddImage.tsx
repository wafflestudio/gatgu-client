import React, { Dispatch, SetStateAction } from 'react';
import { View, Image, TouchableHighlight, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './AddImage.style';
import PlusSign from '@/assets/PlusSign';

interface Props {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

// TODO:
// - modify to adding multiple images (using image-crop-picker) after ejection

function AddImage({ image, setImage }: Props): JSX.Element {
  const pickImage = async () => {
    // Get permission to access photo gallery
    async () => {
      // confirm that the platform is on ios or android
      if (Platform.OS !== 'web') {
        // asynchronously ask for permission, receive status (whether granted permission or not)
        // status can either be 'granted', 'undetermined' or 'denied
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    // show window to select photo from gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // which type of media that can be picked (in this case, images and videos)
      allowsEditing: true, // whether we can crop the image, trim the video
      aspect: [4, 3], // aspect ratio that is kept when editing
      quality: 1, // maximum quality of compression
    });

    // if user didn't cancel while picking an image, set state to the picked image's uri
    if (!result.cancelled) {
      setImage(result.uri);
    }
    // else do nothing
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={pickImage}>
        {image === '' ? (
          <View style={styles.photoContainer}>
            <PlusSign style={styles.defaultPhoto} />
          </View>
        ) : (
          <View style={styles.photoContainer}>
            <Image
              style={styles.photo}
              source={{
                uri: image,
              }}
            />
          </View>
        )}
      </TouchableHighlight>
    </View>
  );
}

export default AddImage;
