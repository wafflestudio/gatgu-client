import React, { useState } from 'react';
import { View, TextInput, Text, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, Modal } from 'native-base';

import { chatAPI } from '@/apis';
import { emptyURL } from '@/constants/image';
import { APItype } from '@/enums/image';
import { useToaster } from '@/helpers/hooks';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import usePickImage from '@/helpers/hooks/usePickImage';
import { palette } from '@/styles';
import { IMessageImage } from '@/types/chat';

import styles from './InputBar.style';

interface IInputBarInterface {
  input: IMessageImage;
  setInput: (value: IMessageImage) => void;
  handleSendMessage: (input: IMessageImage, img: string) => void;
  id?: number;
  article_id: number;
}

function InputBar({
  input,
  setInput,
  handleSendMessage,
  id,
  article_id,
}: IInputBarInterface): JSX.Element {
  const toaster = useToaster();
  const { pickSingleImage } = usePickImage({
    width: 300,
    height: 400,
    cropping: true,
    includeBase64: true,
    mediaType: 'photo',
  });
  const selfId = id ? id : -1;
  const { uploadSingleImage } = useImageUpload(APItype.chat, selfId);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [wishPrice, setWishPrice] = useState<string>('');
  const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false);
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState<number>(0);

  const pickFromGallery = () => {
    setImageIsLoading(true);
    pickSingleImage()
      .then((img) => {
        img &&
          uploadSingleImage({ mime: img.mime, path: img.path })
            .then((url) => {
              setInput({ text: input.text, imgUrl: url });
              handleSendMessage({ text: input.text, imgUrl: url }, '-1');
            })
            .catch((e) => {
              console.log(e);
            });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setImageIsLoading(false);
      });
  };

  const handleDelete = () => {
    setInput({ text: input.text, imgUrl: emptyURL });
  };

  const handleCamera = () => {
    setImageIsLoading(true);
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((img) => {
        img &&
          uploadSingleImage({ mime: img.mime, path: img.path })
            .then((url) => {
              setInput({ text: input.text, imgUrl: url });
              handleSendMessage(input, '-1');
            })
            .catch((e) => {
              console.log(e);
            });
      })
      .catch((e) => {
        console.error('CAMERA', e);
      })
      .finally(() => {
        setImageIsLoading(false);
      });
  };

  const handleUpdateStatusRequest = () => {
    setSubmitIsLoading(true);
    chatAPI
      .changeParticipantStatus(article_id, {
        wish_price: parseInt(wishPrice),
        participant_id: selfId,
      })
      .then(() => {
        toaster.success('상태가 바뀌었습니다.');
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toaster.error('에러가 발생했습니다. 다시 시도해주세요.');
      })
      .finally(() => {
        setSubmitIsLoading(false);
      });
  };
  return (
    <View style={styles.bar}>
      {optionsOpen ? (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={handleCamera}>
              <View style={styles.inputIcon}>
                <Icon name="camera-alt" size={25} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickFromGallery}>
              <View style={styles.inputIcon}>
                <Icon name="image-search" size={25} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <View style={styles.inputIcon}>
                <Icon name="attach-money" size={25} />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setOptionsOpen(false)}>
            <View style={styles.inputIcon}>
              <Icon name="close" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={() => setOptionsOpen(true)}>
            <View style={styles.inputIcon}>
              <Icon name="add" size={25} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: palette.borderGray,
              borderBottomWidth: 1,
              width: '88%',
              marginBottom: 10,
              marginTop: 7,
            }}
          >
            <TextInput
              placeholderTextColor={palette.gray}
              placeholder="메시지를 입력하세요"
              style={{ height: inputHeight + 10 }}
              multiline={true}
              numberOfLines={4}
              value={input.text}
              onChangeText={(txt) =>
                setInput({ text: txt, imgUrl: input.imgUrl })
              }
              onContentSizeChange={(event) =>
                setInputHeight(event.nativeEvent.contentSize.height)
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => handleSendMessage(input, '-1')}
            disabled={input.text.length === 0}
          >
            <View style={styles.inputIcon}>
              <Icon
                name="send"
                size={20}
                color={input.text.length === 0 ? palette.gray : palette.dark}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}
      {input.imgUrl !== emptyURL &&
        (imageIsLoading ? (
          <View>
            <ActivityIndicator size={40} color={palette.blue} />
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" size={27} />
            </TouchableOpacity>
            <Image source={{ uri: input.imgUrl }} style={styles.image} />
          </View>
        ))}

      {modalOpen ? (
        <Modal isOpen size="lg" onClose={() => setModalOpen(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>희망 금액</Modal.Header>

            <Modal.Body height="100%">
              <View style={styles.modalBox}>
                <TextInput
                  placeholder="제출하고 싶은 희망 금액을 입력해주세요."
                  placeholderTextColor={palette.gray}
                  value={wishPrice}
                  maxLength={10}
                  onChangeText={(txt) =>
                    setWishPrice(txt.replace(/[^0-9]/g, ''))
                  }
                  keyboardType="number-pad"
                />
                <Text>원</Text>
              </View>

              <Button
                isLoading={submitIsLoading}
                onPress={handleUpdateStatusRequest}
                style={styles.button}
              >
                제출하기
              </Button>
            </Modal.Body>

            <Modal.Footer></Modal.Footer>
          </Modal.Content>
        </Modal>
      ) : null}
    </View>
  );
}

export default InputBar;
