import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { WriteArticle } from '@/components';

export type TWriteArticleStackParamList = {
  WriteArticle: undefined;
};

const WriteArticleStack = createStackNavigator<TWriteArticleStackParamList>();

function WriteArticleStackScreen(): JSX.Element {
  return (
    <WriteArticleStack.Navigator>
      <WriteArticleStack.Screen
        name="WriteArticle"
        component={WriteArticle}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </WriteArticleStack.Navigator>
  );
}

export default WriteArticleStackScreen;
