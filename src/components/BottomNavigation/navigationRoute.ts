import {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
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
  // TODO: modify to Search
};

export default routes;
