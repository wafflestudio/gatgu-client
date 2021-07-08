import { useEffect, useRef } from 'react';

import GatguWebSocket from './ChattingWebsocket';
import { GatguWebSocketContext } from './Context';

const GatguWebsocketProvider: React.FC = ({ children }) => {
  const wsRef = useRef<GatguWebSocket>();

  useEffect(() => {
    if (wsRef.current === undefined) {
      wsRef.current = new GatguWebSocket('');
    }
  });

  return (
    <GatguWebSocketContext.Provider value={{}}>
      {children}
    </GatguWebSocketContext.Provider>
  );
};
