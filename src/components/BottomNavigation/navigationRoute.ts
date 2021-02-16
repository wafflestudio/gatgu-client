import {
  WriteArticle,
  ChattingList,
  Home,
  Profile,
  AppLoading,
  Article,
  Search,
} from '@/screens';

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
  // TODO: modify to Search
  AppLoading: {
    name: 'AppLoading',
    component: Search,
  },
  // WILL REMOVE: temporarily added it to visualize layout without bothering myself with naviation
  Article: {
    name: 'Article',
    component: Article,
  },
};

export default routes;
