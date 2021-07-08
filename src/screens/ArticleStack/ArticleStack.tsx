import React, { useLayoutEffect } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { Icon } from 'native-base';

import { DrawerActions, useNavigation } from '@react-navigation/core';
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
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableHighlight
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Icon name="menu" />
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

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