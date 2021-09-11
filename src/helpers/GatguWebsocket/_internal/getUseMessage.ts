import React, { useContext, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

import { WebsocketCustomEvent, WebsocketEventMap, WsContext } from './types';

export type TUseWsCallbacks<T = any> = {
  onmessage: (msg: WebsocketEventMap<T>['onmessage']['data']) => void;
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
    const emitterSubscription = DeviceEventEmitter.addListener(
      WebsocketCustomEvent.Message,
      handleOnmessage
    );

    return () => {
      // please verify if below is right
      emitterSubscription.remove();
    };
  }, [onmessage]);

  useEffect(() => {
    if (!onerror) {
      return;
    }

    const handleOnerror = (e: any) => onerror(e.detail);
    const emitterSubscription = DeviceEventEmitter.addListener(
      WebsocketCustomEvent.Error,
      handleOnerror
    );

    return () => {
      emitterSubscription.remove();
    };
  }, [onerror]);

  useEffect(() => {
    if (!onopen) {
      return;
    }

    const handleOnopen = (e: any) => onopen(e.detail);
    const emitterSubscription = DeviceEventEmitter.addListener(
      WebsocketCustomEvent.Open,
      handleOnopen
    );

    return () => {
      emitterSubscription.remove();
    };
  }, [onopen]);

  useEffect(() => {
    if (!onclose) {
      return;
    }

    const handleOnclose = (e: any) => onclose(e.detail);
    const emitterSubscription = DeviceEventEmitter.addListener(
      WebsocketCustomEvent.Close,
      handleOnclose
    );

    return () => {
      emitterSubscription.remove();
    };
  }, [onclose]);

  return { sendWsMessage };
};

export default getUseMessage;
