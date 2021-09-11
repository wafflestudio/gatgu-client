import ReconnectingWebsocket from 'reconnecting-websocket';

import { TWsMessage, WebsocketEventMap } from './types';

export interface IBaseWebsocketOption {
  maxRetryCount?: number;
  heartbeatIntervalTime?: number;
  debug?: boolean;
}

const DEFAULT_WEBSOCKET_OPTION: IBaseWebsocketOption = {
  maxRetryCount: 10,
  heartbeatIntervalTime: 2000,
  debug: false,
};

class BaseWebsocket {
  private _ws: ReconnectingWebsocket;

  private _options: Required<IBaseWebsocketOption>;

  private _pingpongCount: number;
  private _pingSendingIntervalId?: number;
  private _pongCheckingIntervalId?: number;
  private _retryCount: number;

  public promiseByWsID: Map<
    any,
    {
      resolve: any;
      reject: any;
      count: number;
      timeoutID: number;
      resolveCondition?: (data: TWsMessage) => boolean;
      rejectCondition?: (data: TWsMessage) => boolean;
    }
  >;

  constructor(url: string, options?: IBaseWebsocketOption) {
    console.log('Websocket connected >', url);
    this._ws = new ReconnectingWebsocket(url);

    this._pingpongCount = 0;
    this._retryCount = 0;

    this._options = {
      ...DEFAULT_WEBSOCKET_OPTION,
      ...options,
    } as Required<IBaseWebsocketOption>;

    this.promiseByWsID = new Map();

    this._ws.onopen = this._onopen.bind(this);
    this._ws.onmessage = this._onmessage.bind(this);
    this._ws.onerror = this._onerror.bind(this);
    this._ws.onclose = this._onclose.bind(this);
  }

  private _startHeartBeat() {
    this._stopHeartBeat();
    const { heartbeatIntervalTime } = this._options;

    this._pingSendingIntervalId = window.setInterval(() => {
      this.send({
        type: 'PING',
        data: Date.now(),
        pp: this._pingpongCount,
      });

      this._pingpongCount += 1;
    }, heartbeatIntervalTime);

    this._pongCheckingIntervalId = window.setInterval(() => {
      if (this._pingpongCount <= 2) {
        return;
      }

      if (this._retryCount > this._options.maxRetryCount) {
        this._stopHeartBeat();
        return;
      }

      this._ws.reconnect();
      this._retryCount += 1;
      this._pingpongCount = 0;
    }, heartbeatIntervalTime);
  }

  private _stopHeartBeat() {
    clearInterval(this._pingSendingIntervalId);
    clearInterval(this._pongCheckingIntervalId);
  }

  private _onopen(e: WebsocketEventMap['onopen']) {
    this._startHeartBeat();

    if (this.onopen) {
      this.onopen(e);
    }
  }

  private _onclose(e: WebsocketEventMap['onclose']) {
    this._stopHeartBeat();

    if (this.onclose) {
      this.onclose(e);
    }
  }

  private _onerror(e: WebsocketEventMap['onerror']) {
    if (this.onerror) {
      this.onerror(e);
    }
  }

  private _onmessage(e: WebsocketEventMap['onmessage']) {
    const message = JSON.parse(e.data) as TWsMessage;
    console.log('-----', JSON.stringify(message, null, 2));

    switch (message.type) {
      case 'PONG':
        this._pingpongCount = 0;
        this._log(message);
        break;

      // // success cases
      // case WSMessage.ENTER_ROOM_SUCCESS:
      // case WSMessage.RECEIVE_MESSAGE_SUCCESS: {
      //   const promise = this.promiseByWsID.get(message.websocket_id);
      //   if (promise) {
      //     promise.resolve(message);
      //     this.promiseByWsID.delete(message.websocket_id);
      //   }
      //   if (this.onmessage) {
      //     this.onmessage({ ...e, data: message });
      //   }
      //   return;
      // }

      // // failure cases
      // case WSMessage.ENTER_ROOM_FAILURE:
      // case WSMessage.RECEIVE_MESSAGE_FAILURE: {
      //   const promise = this.promiseByWsID.get(message.websocket_id);
      //   if (promise) {
      //     promise.reject(message);
      //     this.promiseByWsID.delete(message.websocket_id);
      //   }
      //   if (this.onmessage) {
      //     this.onmessage({ ...e, data: message });
      //   }
      //   return;
      // }

      // other cases
      default: {
        const promise = this.promiseByWsID.get(message.websocket_id);
        if (promise) {
          if (promise.resolveCondition && promise.resolveCondition(message)) {
            promise.resolve(message);
            this.promiseByWsID.delete(message.websocket_id);
          } else if (
            promise.rejectCondition &&
            promise.rejectCondition(message)
          ) {
            promise.reject(message);
            this.promiseByWsID.delete(message.websocket_id);
          } else {
            promise.reject(message);
          }
          break;
        }

        if (this.onmessage) {
          this.onmessage({ ...e, data: message });
        }
      }
    }
  }

  private _log(message: any) {
    if (this._options.debug) {
      console.debug(message);
    }
  }

  public onmessage: ReconnectingWebsocket['onmessage'] = null;
  public onopen: ReconnectingWebsocket['onopen'] = null;
  public onclose: ReconnectingWebsocket['onclose'] = null;
  public onerror: ReconnectingWebsocket['onerror'] = null;

  public close() {
    this._ws.close();
  }
  public send(data: any) {
    this._ws.send(JSON.stringify(data));
    this._log(data);
  }
}

export default BaseWebsocket;
