import React from 'react';

import { WriteArticle } from '@/components';
import { createGatguStackNavigator } from '@/helpers/functions/navigation';

export enum EWriteArticleStackScreens {
  WriteArticle = 'WriteArticles',
}

export type TWriteArticleStackParamList = {
  [EWriteArticleStackScreens.WriteArticle]: undefined;
};

const WriteArticleStack = createGatguStackNavigator<TWriteArticleStackParamList>();

function WriteArticleStackScreen(): JSX.Element {
  return (
    <WriteArticleStack.Navigator>
      <WriteArticleStack.Screen
        name={EWriteArticleStackScreens.WriteArticle}
        component={WriteArticle}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </WriteArticleStack.Navigator>
  );
}

export default WriteArticleStackScreen;
