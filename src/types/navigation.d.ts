// tsx 사용시 사용자 정의 type 적는 곳.

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

// type to use when using useRoute for ArticleDrawer screens
export type ArticleDrawerParamList = {
  ArticlePage: {
    id: number;
  };
};
