import React from 'react';

import { Box, Text } from 'native-base';

import { EmptyTemplate } from '@/components';
import { typo } from '@/styles';

interface IUserGatguEmptyProps {
  title: string;
  content: React.ReactNode;
}

const UserGatguEmpty: React.FC<IUserGatguEmptyProps> = ({ title, content }) => {
  return (
    <EmptyTemplate>
      <EmptyTemplate.Body>
        <Box alignItems="center" mb="10px">
          <Text style={typo.semiTitle} bold>
            {title}
          </Text>
        </Box>
        {content}
      </EmptyTemplate.Body>
    </EmptyTemplate>
  );
};

export default UserGatguEmpty;
