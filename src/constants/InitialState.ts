import { IArticleProps } from '@/types/article';
import { IChattingRoom } from '@/types/chat';
import { IS_MONEY, Status } from './Enum';

export const initialArticle = {
  id: '0',
  writer: {
    profile_id: 1,
    picture:
      'https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-mobileMasterAt3x-v2.jpg',
    nickname: 'nickname',
    address: 'address',
    phonenumber: '010-0000-0000',
  },
  title: 'title (string)',
  description: `이상은 귀는 아름답고 쓸쓸한 그들의 위하여 동산에는 교향악이다. 실로 힘차게 이는 실현에 따뜻한 이것을 끓는다. 수 따뜻한 공자는 없으면, 것이다.보라, 얼마나 이것이다.\n
  커다란 고행을 밥을 노래하며 칼이다. 동력은 꽃 천고에 사막이다. 가치를 산야에 불어 가장 힘있다. 반짝이는 구하기 영원히 뭇 위하여, 투명하되 유소년에게서 살 것은 보라.\n
  청춘은 설산에서 사랑의 구하기 만물은 것이다. 영원히 열락의 충분히 이것이다. 인류의 위하여서, 든 청춘을 무엇이 있다.`,
  location: 'location in detail (string) ',
  product_url:
    'https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/unsplash-Josh-Earl.jpg',
  image_url: [],
  thumbnail_url: 'https://www.dw.com/image/43055387_403.jpg',
  need_type: IS_MONEY,
  price_min: 15000,
  people_count_min: 3,
  time_max: '2021-02-28',
  created_at: '2021-02-10',
  updated_at: '2021-02-10',
  deleted_at: '2021-02-15',
  current: 10000,
} as IArticleProps;

export const initialChatInfo = {
  id: 0,
  participant: [],
  article: 0,
  orderStatus: Status.UNDEFINED_STATUS,
  trackingNumber: '',
  uri: '',
  title: '',
  chat: '',
  time: 0,
  nickName: '',
} as IChattingRoom;
