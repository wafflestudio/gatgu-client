import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import styles from './Header.style';

// need to pass functions for the buttons
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
}

function Header({
  title,
  left,
  right,
  titleStyle,
  leftCallback,
  rightCallback,
  leftContainerStyle,
  rightContainerStyle,
  titleContainerStyle,
}: IHeaderProps): JSX.Element {
  return (
    <View style={styles.header}>
      {left ? (
        <TouchableHighlight
          style={[styles.leftButton, leftContainerStyle]}
          onPress={leftCallback}
        >
          {left}
        </TouchableHighlight>
      ) : (
        <View style={[styles.leftButton, leftContainerStyle]} />
      )}
      <View style={[styles.titleContainer, titleContainerStyle]}>
        {title && (
          <Text style={[styles.basicTitleText, titleStyle]}>{title}</Text>
        )}
      </View>
      {right ? (
        <TouchableHighlight
          style={[styles.rightButton, rightContainerStyle]}
          onPress={rightCallback}
        >
          {right}
        </TouchableHighlight>
      ) : (
        <View style={[styles.rightButton, rightContainerStyle]} />
      )}
    </View>
  );
}

export default Header;
