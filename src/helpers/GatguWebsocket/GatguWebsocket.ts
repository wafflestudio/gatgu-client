import React, { createContext } from 'react';

import getWsProvider from './_internal/Provider';
import getUseInit from './_internal/getUseInit';
import getUseMessage from './_internal/getUseMessage';
import { TWsInit, WsContextValue } from './_internal/types';

class GatguWebSocket {
  public Provider: React.FC;
  public useMessage: ReturnType<typeof getUseMessage>;
  public useInit: TWsInit;

  constructor() {
    const wsContext = createContext({} as WsContextValue);

    this.Provider = getWsProvider(wsContext);
    this.useMessage = getUseMessage(wsContext);
    this.useInit = getUseInit(wsContext);
  }
}

export default new GatguWebSocket();
