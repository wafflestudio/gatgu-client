import React from 'react';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useNavigation();
  return (
    <>
      {/*TODO: 헤더로 옮겨야 되는 것도 있고 로그인 안됐을때 그것도 있는데 디자인 나오고 나면 Profile Feature에서 구현 */}
      <Button
        title="로그인 창으로"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="회원가입 창으로"
        onPress={() => navigation.navigate('SignUp')}
      />
    </>
  );
}

export default ProfileTemplate;
