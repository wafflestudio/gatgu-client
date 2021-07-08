import React, { useContext, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

import { WebsocketCustomEvent, WebsocketEventMap, WsContext } from './types';

export type TUseWsCallbacks<T = any> = {
  onmessage: (msg: WebsocketEventMap<T>['onmessage']) => void;
  onerror: (e: WebsocketEventMap['onerror']) => void;
  onopen: (e: WebsocketEventMap['onopen']) => void;
  onclose: (e: WebsocketEventMap['onclose']) => void;
};

const getUseMessage = (wsContext: WsContext) => <T>({
  onmessage,
  onerror,
  onopen,
  onclose,
}: Partial<TUseWsCallbacks<T>> = {}) => {
  const { sendWsMessage } = useContext(wsContext);

  React.useEffect(() => {
    if (!onmessage) {
      return;
    }

    const handleOnmessage = (e: any) => onmessage(e.data);
    DeviceEventEmitter.addListener(
      WebsocketCustomEvent.Message,
      handleOnmessage
    );

    return () => {
      DeviceEventEmitter.removeListener(
        WebsocketCustomEvent.Message,
        handleOnmessage
      );
    };
  }, [onmessage]);

  useEffect(() => {
    if (!onerror) {
      return;
    }

    const handleOnerror = (e: any) => onerror(e.detail);
    DeviceEventEmitter.addListener(WebsocketCustomEvent.Error, handleOnerror);

    return () =>
      DeviceEventEmitter.removeListener(
        WebsocketCustomEvent.Error,
        handleOnerror
      );
  }, [onerror]);

  useEffect(() => {
    if (!onopen) {
      return;
    }

    const handleOnopen = (e: any) => onopen(e.detail);
    DeviceEventEmitter.addListener(WebsocketCustomEvent.Open, handleOnopen);

    return () =>
      DeviceEventEmitter.removeListener(
        WebsocketCustomEvent.Open,
        handleOnopen
      );
  }, [onopen]);

  useEffect(() => {
    if (!onclose) {
      return;
    }

    const handleOnclose = (e: any) => onclose(e.detail);
    DeviceEventEmitter.addListener(WebsocketCustomEvent.Close, handleOnclose);

    return () =>
      DeviceEventEmitter.removeListener(
        WebsocketCustomEvent.Close,
        handleOnclose
      );
  }, [onclose]);

  return { sendWsMessage };
};

export default getUseMessage;
