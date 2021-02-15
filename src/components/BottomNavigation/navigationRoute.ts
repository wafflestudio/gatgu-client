import {
  WriteArticle,
  ChattingList,
  Profile,
  AppLoading,
  Article,
} from '@/screens';

import { HomeStackScreen } from '@/helpers/routes';

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
    component: AppLoading,
  },

  // WILL REMOVE: temporarily added it to visualize layout without bothering myself with naviation
  Article: {
    name: 'Article',
    component: Article,
  },
};

export default routes;
