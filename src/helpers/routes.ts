import { EAppStackScreens } from '@/App.router';
import { EArticleStackScreens } from '@/screens/ArticleStack/ArticleStack';
import { EChattingListStackScreens } from '@/screens/ChattingListStack/ChattingListStack';
import { EChattingRoomStackScreens } from '@/screens/ChattingRoomStack/ChattingRoomStack';
import { EHomeStackScreens } from '@/screens/HomeStack/HomeStack';
import { ESearchStackScreens } from '@/screens/SearchStack/SearchStack';
import { ESubStackScreens } from '@/screens/SubStack/SubStack';
import { EUserStackScreens } from '@/screens/UserStack/UserStack';
import { EWriteArticleStackScreens } from '@/screens/WriteArticleStack/WriteArticleStack';

export const AppRoutes = Object.freeze({
  ...EArticleStackScreens,
  ...EChattingListStackScreens,
  ...EChattingRoomStackScreens,
  ...ESearchStackScreens,
  ...EHomeStackScreens,
  ...EUserStackScreens,
  ...EWriteArticleStackScreens,
  ...EAppStackScreens,
  ...ESubStackScreens,
});
