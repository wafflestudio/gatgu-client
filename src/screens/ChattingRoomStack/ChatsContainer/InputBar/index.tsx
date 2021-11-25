import React, { useState } from 'react';
import { View, TextInput, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import styled from 'styled-components/native';

import { chatAPI } from '@/apis';
import { GButton, GInput, GModal } from '@/components/Gatgu';
import { emptyURL } from '@/constants/image';
import { APItype } from '@/enums/image';
import { useToaster } from '@/helpers/hooks';
import useImageUpload from '@/helpers/hooks/useImageUpload';
import usePickImage from '@/helpers/hooks/usePickImage';
import { fetchingParticipants } from '@/store/chatSlice';
import { palette } from '@/styles';
import { IMessageImage } from '@/types/chat';

import styles from './InputBar.style';

export const CHATTING_ROOM_INPUT_HEIGHT = 31;
export const CHATTING_ROOM_INPUT_BAR_HEIGHT = 68 + 7;

interface IInputBarInterface {
  input: IMessageImage;
  setInput: (value: IMessageImage) => void;
  handleSendMessage: (input: IMessageImage, img: string) => void;
  id?: number;
  article_id: number;
  author_id?: number;
}

const StyledTouchableIcon = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

function InputBar({
  input,
  setInput,
  handleSendMessage,
  id,
  article_id,
  author_id,
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
  const dispatch = useDispatch();

  const pickFromGallery = () => {
    setImageIsLoading(true);
    pickSingleImage()
      .then((img) => {
        img &&
          uploadSingleImage({ mime: img.mime, path: img.path })
            .then((url) => {
              console.log('image upload success');
              setInput({ text: input.text, imgUrl: url });
              handleSendMessage({ text: input.text, imgUrl: url }, '-1');
              setModalOpen(false);
              setImageIsLoading(false);
            })
            .catch((e) => {
              console.error(e);
              setModalOpen(false);
              setImageIsLoading(false);
            });
      })
      .catch((e) => {
        console.error(e);
        setModalOpen(false);
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
              setModalOpen(false);
              setImageIsLoading(false);
            })
            .catch((e) => {
              console.error(e);
              setModalOpen(false);
              setImageIsLoading(false);
              toaster.error(
                '이미지를 업로드하는데 실패하였습니다. 다시 시도해주세요.'
              );
            });
      })
      .catch((e) => {
        setModalOpen(false);
        console.error('CAMERA', e);
        setImageIsLoading(false);
      });
  };

  const handleUpdateStatusRequest = () => {
    setSubmitIsLoading(true);
    chatAPI
      .changeParticipantStatus(article_id, {
        wish_price: parseInt(wishPrice),
      })
      .then(() => {
        toaster.success('희망금액 변경 요청이 완료되었습니다.');
        setModalOpen(false);
        setSubmitIsLoading(false);
        dispatch(fetchingParticipants(article_id));
        setWishPrice('');
        setOptionsOpen(false);
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
        toaster.error('에러가 발생했습니다. 다시 시도해주세요.');
        setModalOpen(false);
        setSubmitIsLoading(false);
        setWishPrice('');
        setOptionsOpen(false);
      });
  };

  return (
    <View style={[styles.bar]}>
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
            {author_id !== selfId && (
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <View style={styles.inputIcon}>
                  <Icon name="attach-money" size={25} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => setOptionsOpen(false)}>
            <View style={styles.inputIcon}>
              <Icon name="close" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputWrapper}>
          <StyledTouchableIcon onPress={() => setOptionsOpen(true)}>
            <View style={styles.inputIcon}>
              <Icon name="add" size={25} />
            </View>
          </StyledTouchableIcon>
          <TextInput
            placeholderTextColor={palette.gray}
            placeholder="메시지를 입력하세요"
            style={{
              maxHeight: CHATTING_ROOM_INPUT_HEIGHT + 87,
              borderBottomColor: palette.borderGray,
              borderBottomWidth: 1,
              width: '88%',
              marginBottom: 10,
              marginTop: 7,
            }}
            multiline={true}
            numberOfLines={1}
            value={input.text}
            onChangeText={(txt) => {
              setInput({ text: txt, imgUrl: input.imgUrl });
            }}
            autoCorrect={false}
            maxLength={1000}
          />
          <StyledTouchableIcon
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
          </StyledTouchableIcon>
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
        <GModal onClose={() => setModalOpen(false)}>
          <GModal.Header>희망 금액</GModal.Header>
          <GModal.Body>
            <GInput
              placeholder="제출하고 싶은 희망 금액을 입력해주세요."
              placeholderTextColor={palette.gray}
              value={wishPrice}
              maxLength={10}
              onChangeText={(txt) => setWishPrice(txt.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
            />
          </GModal.Body>
          <GModal.Footer>
            <GButton
              width="full"
              size="large"
              isLoading={submitIsLoading}
              onPress={handleUpdateStatusRequest}
            >
              제출하기
            </GButton>
          </GModal.Footer>
        </GModal>
      ) : null}
    </View>
  );
}

export default InputBar;
