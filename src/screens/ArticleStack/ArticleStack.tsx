import React from 'react';
import { Platform, StatusBar } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

// import { createGatguDrawerNavigator } from '@/helpers/functions/navigation';
import { useSelector } from '@/helpers/hooks';
import DrawerTemplate from '@/screens/ArticleStack/DrawerContent';
import { TNavigateFlag } from '@/types/shared';

import ArticlePage from './Article';
import EditArticleTemplate from './EditArticle';

export enum EArticleStackScreens {
  Article = 'Article',
  EditArticle = 'EditArticle',
}

export type TArticleStackScreenParamList = {
  [EArticleStackScreens.Article]: {
    id: number;
  } & TNavigateFlag;
  [EArticleStackScreens.EditArticle]: undefined;
};

const ArticleDrawer = createDrawerNavigator<TArticleStackScreenParamList>();

const ArticleStackScreen = () => {
  const isLogined = useSelector((state) => state.user.isLogined);

  return (
    <ArticleDrawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
      drawerStyle={{
        width: '57%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
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
        options={{ swipeEnabled: false, title: '글 수정', headerShown: true }}
      />
    </ArticleDrawer.Navigator>
  );
};

export default ArticleStackScreen;
