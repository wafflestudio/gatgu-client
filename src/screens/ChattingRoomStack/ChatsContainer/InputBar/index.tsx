import React, { SetStateAction } from 'react';
import {
  View,
  TextInput,
  Text,
  GestureResponderEvent,
  Alert,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { emptyURL } from '@/constants/image';
import { APItype } from '@/enums/image';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import usePickImage from '@/helpers/hooks/usePickImage';
import { palette } from '@/styles';
import { IMessageImage } from '@/types/chat';

import styles from './InputBar.style';

interface IInputBarInterface {
  input: IMessageImage;
  setInput: (value: IMessageImage) => void;
  handleSendMessage: (event: GestureResponderEvent) => void;
  id?: number;
}

function InputBar({
  input,
  setInput,
  handleSendMessage,
  id,
}: IInputBarInterface): JSX.Element {
  const { pickSingleImage } = usePickImage({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
    mediaType: 'photo',
  });
  const selfId = id ? id : -1;
  const { uploadSingleImage } = useImageUpload(APItype.chat, selfId);

  const pickFromGallery = () => {
    pickSingleImage()
      .then((img) => {
        img &&
          uploadSingleImage({ mime: img.mime, path: img.path })
            .then((ret: string) => {
              return ret;
            })
            .then((url) => {
              setInput({ text: input.text, imgUrl: url });
            })
            .catch((e) => {
              console.log(e);
            });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDelete = () => {
    setInput({ text: input.text, imgUrl: emptyURL });
  };

  const handleUpdateStatusRequest = () => {
    console.log('hello');
  };

  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={() => Alert.alert('open camera')}>
        <View style={styles.inputIcon}>
          <Text>1</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickFromGallery}>
        <View style={styles.inputIcon}>
          <Text>2</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdateStatusRequest}>
        <View style={styles.inputIcon}>
          <Text>3</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={palette.gray}
          placeholder="메시지를 입력하세요"
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          value={input.text}
          onChangeText={(txt) => setInput({ text: txt, imgUrl: input.imgUrl })}
        />
        {input.imgUrl !== emptyURL && (
          <View>
            <Image source={{ uri: input.imgUrl }} style={styles.image} />
            <TouchableOpacity onPress={handleDelete}>
              <Text>DEL</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleSendMessage}>
        <View style={styles.inputIcon}>
          <Text>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default InputBar;
