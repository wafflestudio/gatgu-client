// mock chatting list
import { IChatMessage } from '@/types/chat';

const messages: IChatMessage[] = [
  {
    message: 'hi',
    system: false,
    sent_at: '2021-03-05T12:25:41.188635Z',
    image: '',
    sent_by: {
      nickname: 'heesu',
      picture: 'https://placeimg.com/140/140/any',
    },
  },
  {
    message: '스월비 노래 꼭 들어 보세요!~!!!',
    system: false,
    image: '',
    sent_at: '2021-03-05T12:25:41.188635Z',
    sent_by: {
      nickname: '이제 자야지..',
      picture: 'https://placeimg.com/140/140/any',
    },
  },
  {
    message: '알리바이, art gang money~',
    system: false,
    image: '',
    sent_at: '2021-03-05T12:25:41.188635Z',
    sent_by: {
      nickname: '이제 자야지..',
      picture: 'https://placeimg.com/140/140/any',
    },
  },
  {
    message: '잘 되나??????',
    sent_at: '2021-03-05T12:25:41.188635Z',
    sent_by: {
      nickname: 'aa',
      picture: 'https://placeimg.com/140/140/any',
    },
    system: false,
    image: 'https://placeimg.com/960/540/any',
  },
  {
    message: '희수 정 님이 입장하셨습니다.',
    sent_at: '2021-03-05T12:25:41.188635Z',
    system: true,
    image: '',
  },
  {
    message: '가나다라마바사~',
    sent_at: '2021-03-05T12:25:41.188635Z',
    system: false,
    image: '',
    sent_by: {
      nickname: '희수 정',
      picture: 'https://placeimg.com/140/140/any',
    },
  },
  {
    message: `안녕하세요!`,
    sent_at: '2021-03-05T12:25:41.188635Z',
    system: false,
    image: '',
    sent_by: {
      nickname: '나 판매자',
      picture: 'https://placeimg.com/140/140/any',
    },
  },
  {
    message: '희수님이 입장하셨습니다.',
    system: true,
    image: '',
    sent_at: '2021-03-05T12:25:41.188635Z',
  },
];

export default messages;
