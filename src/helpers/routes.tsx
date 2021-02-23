import {
  WriteArticle,
  ChattingList,
  Profile,
  AppLoading,
  Article,
  Home,
  Notification,
  ChatListElem,
  Login,
  Search,
  SearchedArticle,
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
    name: 'ArticlePage',
    component: Article,
  },
  Notification: {
    name: 'Notification',
    component: Notification,
  },
  ChatListElem: {
    name: 'ChatListElem',
    component: ChatListElem,
  },
  Login: {
    name: 'Login',
    component: Login,
  },
  Search: {
    name: 'Search',
    component: Search,
  },
  SearchedArticle: {
    name: 'SearchedArticle',
    component: SearchedArticle,
  },
};

export default routes;
