import React from 'react';

import { Box } from 'native-base';

const EmptyTemplateBody: React.FC = ({ children }) => {
  return (
    <Box width="230px" maxWidth="90%" alignItems="center">
      {children}
    </Box>
  );
};

export default EmptyTemplateBody;
