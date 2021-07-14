import ReconnectingWebsocket from 'reconnecting-websocket';

import { WebsocketEventMap } from './types';

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

  constructor(url: string, options: IBaseWebsocketOption) {
    this._ws = new ReconnectingWebsocket(`${url}`);

    this._pingpongCount = 0;
    this._retryCount = 0;

    this._options = {
      ...DEFAULT_WEBSOCKET_OPTION,
      ...options,
    } as Required<IBaseWebsocketOption>;

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
    const message = JSON.parse(e.data);

    switch (message.type) {
      case 'PONG':
        this._pingpongCount = 0;
        this._log(message);
        break;

      default:
        if (this.onmessage) {
          this.onmessage({ ...e, data: message });
        }
    }
  }

  private _log(message: string) {
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
