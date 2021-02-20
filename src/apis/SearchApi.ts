import requester from './BaseInstance';

export const getPopularSearchKeyword = async (): Promise<string[]> => {
  // TODO:
  // change after serach api docs are defined
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        '검색어1',
        '검색어2',
        '검색어3',
        '검색어4',
        '검색어5',
        '검색어6',
        '검색어7',
      ]);
    });
  });
};

export const getArticlesWithKeyword = async ({
  keyword,
}: {
  keyword: string;
}): Promise<string[]> => {
  // TODO:
  // change url
  const url = `posts?search=${keyword}`;
  return requester.get(url);
};
