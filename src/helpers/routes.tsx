import {
  WriteArticle,
  ChattingList,
  Profile,
  AppLoading,
  Article,
  Home,
  Notification,
  ChattingRoom,
  Search,
  SearchedArticle,
  ProfileModify,
  SignUp,
  TOS,
  Login,
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
  ChattingRoom: {
    name: 'ChattingRoom',
    component: ChattingRoom,
  },
  Search: {
    name: 'Search',
    component: Search,
  },
  SearchedArticle: {
    name: 'SearchedArticle',
    component: SearchedArticle,
  },
  ProfileModify: {
    name: 'ProfileModify',
    component: ProfileModify,
  },
  SignUp: {
    name: 'SignUp',
    component: SignUp,
  },
  TOS: {
    name: 'TOS',
    component: TOS,
  },
  Login: {
    name: 'Login',
    component: Login,
  },
};

export default routes;
