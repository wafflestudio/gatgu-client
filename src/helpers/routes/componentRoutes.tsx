import {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
} from './stackScreens';

import screens from './screenRoutes';

const componentRoutes = {
  Home: {
    name: screens.Home.name,
    component: HomeStackScreen,
  },
  WriteArticle: {
    name: screens.WriteArticle.name,
    component: WriteArticleStackScreen,
  },
  ChattingList: {
    name: screens.ChattingList.name,
    component: screens.ChattingList.screen,
  },
  Profile: {
    name: screens.Profile.name,
    component: ProfileStackScreen,
  },
  AppLoading: {
    name: screens.AppLoading.name,
    component: screens.AppLoading.screen,
  },
  Article: {
    name: screens.Article.name,
    component: screens.Article.screen,
  },
  Notification: {
    name: screens.Notification.name,
    component: screens.Notification.screen,
  },
};

export default componentRoutes;
