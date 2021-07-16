import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerTemplate from '@/screens/ArticleStack/DrawerContent';

import ArticlePage from './Article';
import EditArticleTemplate from './EditArticle';

export enum EArticleStackScreens {
  Article = 'Article',
  EditArticle = 'EditArticle',
}

export type TArticleStackScreenParamList = {
  [EArticleStackScreens.Article]: {
    id: number;
  };
  [EArticleStackScreens.EditArticle]: undefined;
};

const ArticleDrawer = createDrawerNavigator<TArticleStackScreenParamList>();

const ArticleStackScreen = () => {
  return (
    <ArticleDrawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
      drawerStyle={{ width: '57%' }}
    >
      <ArticleDrawer.Screen
        name={EArticleStackScreens.Article}
        component={ArticlePage}
      />
      <ArticleDrawer.Screen
        name={EArticleStackScreens.EditArticle}
        component={EditArticleTemplate}
      />
    </ArticleDrawer.Navigator>
  );
};

export default ArticleStackScreen;
