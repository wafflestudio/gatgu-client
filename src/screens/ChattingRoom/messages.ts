//mock data

const messages = [
  {
    _id: 2,
    text: '스월비 노래 꼭 들어 보세요!~!!!',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
    user: {
      _id: 1,
      name: '나 판매자',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 3,
    text: '응애 나 현민',
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 3,
      name: '현민',
      avatar: 'https://placeimg.com/140/140/any',
    },
    image: 'https://placeimg.com/960/540/any',
  },
  {
    _id: 4,
    text: '현민님이 입장하셨습니다.',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    system: true,
  },
  {
    _id: 5,
    text: '가나다라마바사~',
    createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
    user: {
      _id: 2,
      name: '희수 정',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 6,
    text: '현하~',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: '희수 정',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 7,
    text: `안녕하세요!`,
    createdAt: new Date(Date.UTC(2016, 5, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: '나 판매자',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  {
    _id: 8,
    text: '희수님이 입장하셨습니다.',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    system: true,
  },
];

export default messages;
