import { Label, Title } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Header from '@/components/Header';

function Article() {
  return (
    <ScrollView>
      <Header title="글 상세" left={true} right={false} />
    </ScrollView>
  );
}

export default Article;
