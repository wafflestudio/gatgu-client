export interface IArticleSumProps {
  id: number;
  title: string;
  dayLeft: string;
  goal: string;
  location: string;
  percent: number;
  uri: string;
  created: string;
  isMoney: boolean;
}

export interface IPageLimitRes {
  pageLimit: {
    limit: number;
  };
}
