import {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
  SearchStackScreen,
} from '@/screens/StackScreens';

const routes = {
  tarBarOption: {
    activeTintColor: 'black',
    style: {
      height: 69,
      paddingTop: 14.5,
      paddingBottom: 9,
    },
    labelStyle: {
      color: 'black',
      paddingTop: 1.6,
      fontSize: 10,
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
