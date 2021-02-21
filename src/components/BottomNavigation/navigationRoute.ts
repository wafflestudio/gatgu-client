import {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
  SearchStackScreen,
} from '@/screens/StackScreens';

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
    component: ProfileStackScreen,
  },
  Search: {
    name: 'Search',
    component: SearchStackScreen,
  },
};

export default routes;
