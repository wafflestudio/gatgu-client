// tsx 사용시 사용자 정의 type 적는 곳.

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type EditArticleParamList = {
  EditArticle: {
    id: number;
  };
};

export type SignUpStackParamList = {
  TOS: {
    title: string;
    checked: boolean;
    isOptional: boolean;
    onPress: () => void;
  };
};

export type ChattingDrawerParamList = {
  ChattingRoom: {
    id: number;
    author_id: number;
  };
};
