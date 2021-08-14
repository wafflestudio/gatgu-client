import React from 'react';

import { Flex } from 'native-base';

import { WriteArticle as WriteArticleTemplate } from '@/components';
import { UnAuthorizedModal } from '@/components/UnAuthorizedModal';
import { useSelector } from '@/helpers/hooks';

function WriteArticle(): JSX.Element {
  const isLogined = useSelector((state) => state.user.isLogined);

  // if (!isLogined) {
  //   return (
  //     <Flex>
  //       <UnAuthorizedModal />
  //     </Flex>
  //   );
  // }

  return <WriteArticleTemplate isEdit={false} />;
}

export default WriteArticle;
