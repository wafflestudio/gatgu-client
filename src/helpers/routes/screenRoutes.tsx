import {
  WriteArticle,
  ChattingList,
  Profile,
  AppLoading,
  Article,
  Home,
  Notification,
} from '@/screens';

export const screenRoutes = {
  Home: {
    name: 'Home',
    screen: Home,
  },
  WriteArticle: {
    name: 'WriteArticle',
    screen: WriteArticle,
  },
  ChattingList: {
    name: 'ChattingList',
    screen: ChattingList,
  },
  Profile: {
    name: 'Profile',
    screen: Profile,
  },
  AppLoading: {
    name: 'AppLoading',
    screen: AppLoading,
  },
  Article: {
    name: 'Article',
    screen: Article,
  },
  Notification: {
    name: 'Notification',
    screen: Notification,
  },
};

export default screenRoutes;
