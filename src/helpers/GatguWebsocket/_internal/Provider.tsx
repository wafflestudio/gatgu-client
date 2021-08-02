import React from 'react';
import { useEffect, useRef } from 'react';
import { DeviceEventEmitter } from 'react-native';

import BaseWebsocket, { IBaseWebsocketOption } from './BaseWebsocket';
import { TWsMessage, WebsocketCustomEvent } from './types';

const getWsProvider = (Context: any): React.FC => ({ children }) => {
  const wsRef = useRef<BaseWebsocket>();

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  });

  const init = ({
    url,
    token,
    options,
  }: {
    url: string;
    token: string;
    options: IBaseWebsocketOption;
  }) => {
    if (wsRef.current) {
      return;
      // wsRef.current.close();
    }
    // if (isNaN(token)) return;

    const ws = new BaseWebsocket(`${url}`, options);

    ws.onopen = (e) => DeviceEventEmitter.emit(WebsocketCustomEvent.Open, e);
    ws.onmessage = (e) =>
      DeviceEventEmitter.emit(WebsocketCustomEvent.Message, e);
    ws.onerror = (e) => DeviceEventEmitter.emit(WebsocketCustomEvent.Error, e);
    ws.onclose = (e) => DeviceEventEmitter.emit(WebsocketCustomEvent.Close, e);

    wsRef.current = ws;
  };

  const sendWsMessage = (data: TWsMessage): Promise<TWsMessage> => {
    if (!wsRef.current) {
      throw new Error(`Don't use "sendWsMessage" before init Websocket"`);
    }

    return new Promise((resolve, reject) => {
      if (wsRef.current) {
        // save websocket in wsMap
        const id = data.websocket_id;

        wsRef.current.wsMap.set(id, {
          resolve,
          reject,
          count: 0,
          timeoutID: 0,
        });
        // send websocket
        wsRef.current.send(data);

        // retry,,,?

        // set timeout in case of failure
        setTimeout(() => {
          if (wsRef.current) {
            wsRef.current.wsMap.delete(id);
            reject(data);
          }
        }, 5000);
      }
    });
  };

  return (
    <Context.Provider value={{ sendWsMessage, init }}>
      {children}
    </Context.Provider>
  );
};

export default getWsProvider;
