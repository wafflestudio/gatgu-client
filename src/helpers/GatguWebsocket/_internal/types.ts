import { Context } from 'react';

import { Event, ErrorEvent, CloseEvent } from 'reconnecting-websocket';

import { IBaseWebsocketOption } from './BaseWebsocket';

export enum WebsocketCustomEvent {
  Open = 'Open',
  Message = 'Message',
  Error = 'Error',
  Close = 'Close',
}

export type WebsocketEvents = Event | ErrorEvent | CloseEvent | MessageEvent;

export type WebsocketEventMap<T = any> = {
  onmessage: MessageEvent<T>;
  onclose: CloseEvent;
  onopen: Event;
  onerror: ErrorEvent;
};

export interface TWsMessage {
  type: string;
  data?: any;
}

export type TWsInit = ({
  url,
  token,
  options,
}: {
  url: string;
  token: number;
  options?: IBaseWebsocketOption;
}) => void;

export type TSendWsMessage = (msg: TWsMessage) => void;

export type WsContextValue = {
  sendWsMessage: TSendWsMessage;
  init: TWsInit;
};

export type WsContext = Context<WsContextValue>;
