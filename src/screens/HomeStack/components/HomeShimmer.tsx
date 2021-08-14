import React from 'react';

import { VStack } from 'native-base';

import ArticleBoxShimmer from '@/components/ArticleBox/ArticleBoxShimmer';
import { mobile } from '@/helpers/mobile';

const HomeShimmer: React.FC = () => {
  const boxCount = Math.floor(mobile.height / 142);

  return (
    <VStack h="100%" backgroundColor="white">
      {new Array(boxCount).fill(null).map((_, idx) => (
        <ArticleBoxShimmer key={idx} />
      ))}
    </VStack>
  );
};

export default HomeShimmer;
