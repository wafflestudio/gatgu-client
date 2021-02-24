import React from 'react';
import Info from './Information';
import Grade from './Grade';
import History from './HistoryList';
import { Button } from '@/components';
import { useNavigation } from '@react-navigation/native';

// TODO: remove this after API 확정
const dummyInfo = {
  profileUrl: 'https://reactjs.org/logo-og.png',
  name: '같구',
  date: '1920.10.80',
  auth: false,
  grade: 2,
  emdrmqwltn: 128,
  dmdekqfbf: 97,
  e_response_time: 10,
  worjfogmlakdfbf: 100,
};

// Profile Component
function ProfileTemplate(): JSX.Element {
  const navigation = useNavigation();
  return (
    <>
      <Info dummyInfo={dummyInfo} />
      <Grade dummyInfo={dummyInfo} />
      <History />
      {/*TODO: 헤더로 옮겨야 되는 것도 있고 로그인 안됐을때 그것도 있는데 디자인 나오고 나면 Profile Feature에서 구현 */}
      <Button
        title="수정 창으로"
        onPress={() => navigation.navigate('ProfileModify')}
      />
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
