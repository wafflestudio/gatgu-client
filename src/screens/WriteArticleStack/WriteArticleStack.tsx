import React from 'react';

import { useIsFocused } from '@react-navigation/core';

import { UnAuthorizedModal } from '@/components/UnAuthorizedModal';
import { createGatguStackNavigator } from '@/helpers/functions/navigation';
import { useSelector } from '@/helpers/hooks';

import WriteArticle from './WriteArticle';

export enum EWriteArticleStackScreens {
  WriteArticle = 'WriteArticles',
}

export type TWriteArticleStackParamList = {
  [EWriteArticleStackScreens.WriteArticle]: undefined;
};

const WriteArticleStack = createGatguStackNavigator<TWriteArticleStackParamList>();

function WriteArticleStackScreen(): JSX.Element {
  const isLogined = useSelector((state) => state.user.isLogined);

  const isScreenFocused = useIsFocused();
  return (
    <>
      <UnAuthorizedModal isOpen={isScreenFocused && !isLogined} />

      <WriteArticleStack.Navigator>
        <WriteArticleStack.Screen
          name={EWriteArticleStackScreens.WriteArticle}
          component={WriteArticle}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </WriteArticleStack.Navigator>
    </>
  );
}

export default WriteArticleStackScreen;
