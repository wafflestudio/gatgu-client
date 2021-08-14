import React from 'react';

import { WriteArticle as WriteArticleTemplate } from '@/components';

function WriteArticle(): JSX.Element {
  return <WriteArticleTemplate isEdit={false} />;
}

export default WriteArticle;
