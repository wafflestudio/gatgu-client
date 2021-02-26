import React from 'react';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Image1, Image2 } from '@/assets/ProfilePage';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View>
      <Text>로그인으로</Text>
      <Text>더 다양한 기능을 사용하세요.</Text>
      <Text>채팅을 통해 거래하거나 나의 등급 등을 알 수 있어요.</Text>
      <Image1 />
      <Image2 />
      <Button
        title="로그인 창으로"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="회원가입 창으로"
        onPress={() => navigation.navigate('SignUp')}
      />
      <View>
        <Button title="약관" onPress={() => alert('not implemented')} />
        <Text>|</Text>
        <Button
          title="개인정보 처리방침"
          onPress={() => alert('not implemented')}
        />
      </View>
    </View>
  );
}

export default ProfileTemplate;
