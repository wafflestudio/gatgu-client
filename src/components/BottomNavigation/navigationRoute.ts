import {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
} from '@/screens/StackScreens';
import { Login, Search } from '@/screens';

const routes = {
  tarBarOption: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    indicatorStyle: {
      backgroundColor: 'white',
    },
    style: {
      height: 60,
    },
  },
  Home: {
    name: 'Home',
    component: HomeStackScreen,
  },
  WriteArticle: {
    name: 'WriteArticle',
    component: WriteArticleStackScreen,
  },
  ChattingList: {
    name: 'ChattingList',
    component: ChattingStackScreen,
  },
  Profile: {
    name: 'Profile',
    component: Login,
  },
  // TODO: modify to Search
  AppLoading: {
    name: 'AppLoading',
    component: Search,
  },
};

export default routes;
