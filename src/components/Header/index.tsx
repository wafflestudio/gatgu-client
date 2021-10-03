import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/core';

import { GText } from '../Gatgu';
import styles from './Header.style';
import HeaderBackButton from './HeaderBackButton';

// need to pass functions for the buttons

export const HEADER_HEIGHT = 50;
export interface IHeaderProps {
  // 헤더 한가운데 들어갈 타이틀 텍스트
  title?: string;
  // 타이틀 텍스트 스타일
  titleStyle?: StyleProp<TextStyle>;
  // 타이틀 텍스트 컨테이너의 스타일
  titleContainerStyle?: StyleProp<ViewStyle>;
  // 헤더 좌측에 들어갈 컴포넌트, left가 undefined면 좌측에 아무것도 보여지지 않음.
  left?: React.ReactNode;
  // left가 존재할 때, 클릭시 실행될 콜백 함수
  leftCallback?: any;
  // left 컴포넌트를 담는 컨테이너의 스타일
  leftContainerStyle?: StyleProp<ViewStyle>;
  right?: React.ReactNode;
  rightCallback?: any;
  rightContainerStyle?: StyleProp<ViewStyle>;
  fixed?: boolean;
}

const Header: React.FC<IHeaderProps> = ({
  title,
  left,
  right,
  leftCallback,
  rightCallback,
  leftContainerStyle,
  rightContainerStyle,
  titleContainerStyle,
  fixed,
}) => {
  const navigation = useNavigation();

  const handleBackButtonClick = () => {
    if (typeof leftCallback === 'function') {
      return leftCallback();
    }

    return navigation.goBack();
  };

  return (
    <View
      style={[
        fixed && {
          position: 'absolute',
          top: 0,
          zIndex: 10,
        },
        styles.header,
      ]}
    >
      {left ? (
        <TouchableOpacity
          style={[styles.leftButton, leftContainerStyle]}
          onPress={handleBackButtonClick}
        >
          {left}
        </TouchableOpacity>
      ) : (
        <View style={[styles.leftButton, leftContainerStyle]} />
      )}
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {title && (
          <GText bold size={18}>
            {title}
          </GText>
        )}
      </View>
      {right ? (
        <TouchableOpacity
          style={[styles.rightButton, rightContainerStyle]}
          onPress={rightCallback}
        >
          {right}
        </TouchableOpacity>
      ) : (
        <View style={[styles.rightButton, rightContainerStyle]} />
      )}
    </View>
  );
};

export default Object.assign(Header, {
  BackButton: HeaderBackButton,
});
