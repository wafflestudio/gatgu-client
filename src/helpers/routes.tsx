import {
  WriteArticle,
  ChattingList,
  Profile,
  AppLoading,
  Article,
  Home,
  Notification,
} from '@/screens';

const routes = {
  Home: {
    name: 'Home',
    component: Home,
  },
  WriteArticle: {
    name: 'WriteArticle',
    component: WriteArticle,
  },
  ChattingList: {
    name: 'ChattingList',
    component: ChattingList,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
  },
  AppLoading: {
    name: 'AppLoading',
    component: AppLoading,
  },
  Article: {
    name: 'Article',
    component: Article,
  },
  Notification: {
    name: 'Notification',
    component: Notification,
  },
};

export default routes;