import React from 'react';
import Header from './Header';
import Info from './Information';
import Grade from './Grade';
import History from './HistoryList';

// TODO: remove this after API 확정
const dummyInfo = {
  profileUrl: 'https://reactjs.org/logo-og.png',
  name: '같구',
  date: '1920-10-80',
  auth: false,
  grade: 2,
  emdrmqwltn: 128,
  dmdekqfbf: 97,
  e_response_time: 10,
  worjfogmlakdfbf: 100,
};

// Profile Component
function ProfileTemplate(): JSX.Element {
  return (
    <>
      <Header />
      <Info dummyInfo={dummyInfo} />
      <Grade dummyInfo={dummyInfo} />
      <History />
    </>
  );
}

export default ProfileTemplate;
