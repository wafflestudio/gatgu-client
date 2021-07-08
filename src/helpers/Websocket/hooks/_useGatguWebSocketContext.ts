import { useContext } from 'react';

import { GatguWebSocketContext } from '../Context';

export const _useGatguWebSocketContext = () =>
  useContext(GatguWebSocketContext);
