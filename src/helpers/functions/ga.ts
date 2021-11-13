import analytics from '@react-native-firebase/analytics';

import { IArticleSummary } from '@/types/article';
import { IUserSimple } from '@/types/user';

type ArticleLogging = Partial<
  Omit<IArticleSummary, 'title'> & {
    article_title: string;
  }
>;

type UserLogging = Partial<
  Omit<IUserSimple, 'id'> & {
    userId: number;
  }
>;

const logSignUp = async () => {
  return await analytics().logSignUp({ method: 'organic' });
};

const logAriticleView = async ({
  userId,
  ...rest
}: ArticleLogging & UserLogging) => {
  return await analytics().logEvent('view_article', {
    user_id: userId,
    ...rest,
  });
};

const logSearchArticle = async (keyword: string) => {
  return await analytics().logSearch({ search_term: keyword });
};

const logWriteArticle = async ({
  userId,
  ...rest
}: ArticleLogging & UserLogging) => {
  return await analytics().logEvent('write_article', {
    user_id: userId,
    ...rest,
  });
};

const logJoinArticle = async ({
  userId,
  ...rest
}: ArticleLogging & UserLogging) => {
  return await analytics().logEvent('join_article', {
    user_id: userId,
    ...rest,
  });
};

const ga = {
  logAriticleView,
  logJoinArticle,
  logSearchArticle,
  logSignUp,
  logWriteArticle,
};

export default ga;
