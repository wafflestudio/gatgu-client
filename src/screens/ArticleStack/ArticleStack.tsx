import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useSelector } from '@/helpers/hooks';
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
  const isLogined = useSelector((state) => state.user.isLogined);

  return (
    <ArticleDrawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
      drawerStyle={{ width: '57%' }}
    >
      <ArticleDrawer.Screen
        name={EArticleStackScreens.Article}
        component={ArticlePage}
        options={{
          swipeEnabled: isLogined,
          title: '같구 모집',
        }}
      />
      <ArticleDrawer.Screen
        name={EArticleStackScreens.EditArticle}
        component={EditArticleTemplate}
        options={{ swipeEnabled: isLogined, title: '글 수정' }}
      />
    </ArticleDrawer.Navigator>
  );
};

export default ArticleStackScreen;
