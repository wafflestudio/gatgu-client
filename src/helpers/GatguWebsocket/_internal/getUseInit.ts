import { useContext, useEffect } from 'react';

import { TWsInit, WsContext } from './types';

const getUseInit = (wsContext: WsContext) => (
  ...option: Parameters<TWsInit>
) => {
  const { init } = useContext(wsContext);
  useEffect(() => {
    init(...option);
  }, [option, init]);
};

export default getUseInit;
