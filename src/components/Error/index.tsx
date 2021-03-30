import React, { useState } from 'react';
import { View, Text, Alert, Modal, Pressable } from 'react-native';

import styles from './Error.style';

interface IErrorProps {
  errMsg: string;
  // errCallback을 넘겨야 한다.
  errCallback: () => void;
}

function Error({ errMsg, errCallback }: IErrorProps): JSX.Element {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={styles.modal}
      >
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <Text style={styles.heading}> 잠시 후 다시 시도해주세요</Text>
            <Text style={styles.description}>{errMsg}</Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.btnText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {modalVisible ? (
        <View style={styles.backfilter}></View>
      ) : (
        <Pressable style={styles.buttonClose} onPress={errCallback}>
          <Text style={styles.btnText}>다시 연결하기</Text>
        </Pressable>
      )}
    </View>
  );
}

export default Error;
