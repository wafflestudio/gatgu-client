export interface IPostProps {
  id: number;
  title: string;
  dayLeft: string;
  goal: string;
  location: string;
  percent: number;
  uri: string;
  created: string;
  money: boolean;
}

export interface IPageLimitRes {
  pageLimit: {
    limit: number;
  };
}
