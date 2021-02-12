import {
  WriteArticlePage,
  Chatting,
  Home,
  Profile,
  ArticlePage,
} from '@/screens';

export default {
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
    component: Home,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
  },
  Chatting: {
    name: 'Chatting',
    component: ArticlePage, // temporarily changed this to visualize layout easily --> will remove
  },
  WriteArticlePage: {
    name: 'WriteArticlePage',
    component: WriteArticlePage,
  },
};
