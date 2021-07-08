import ReconnectingWebsocket from 'reconnecting-websocket';

interface IGatguWebSocketOption {
  heartbeatIntervalTime?: number;
  debug?: boolean;
}

const BASE_WEBSOCKET_URL = '';

const DEFAULT_WEBSOCKET_OPTION: IGatguWebSocketOption = {
  heartbeatIntervalTime: 1000,
  debug: false,
};

class GatguWebSocket {
  private _ws: ReconnectingWebsocket;

  private _token: string;
  private _options: IGatguWebSocketOption;

  private _pingpongCount: number;
  private _pingSendingIntervalId?: number;
  private _pongCheckingIntervalId?: number;

  constructor(
    token: string,
    options: IGatguWebSocketOption = DEFAULT_WEBSOCKET_OPTION
  ) {
    this._ws = new ReconnectingWebsocket(
      `${BASE_WEBSOCKET_URL}/${token}`,
      undefined
    );

    this._pingpongCount = 0;

    this._token = token;
    this._options = options;
  }

  private _startHeartBeat() {
    const { heartbeatIntervalTime } = this._options;

    // send "PING" message periodically for checking
    // websocket is connected stably.
    this._pingSendingIntervalId = setInterval(() => {
      this.send({
        type: 'PING',
        data: Date.now(),
      });

      this._pingpongCount += 1;
    }, heartbeatIntervalTime);

    this._pongCheckingIntervalId = setInterval(() => {
      if (this._pingpongCount > 1) {
        this._ws.reconnect();
        this._pingpongCount = 0;
      }
    }, heartbeatIntervalTime);
  }

  private _stopHeartBeat() {
    clearInterval(this._pingSendingIntervalId);
    clearInterval(this._pongCheckingIntervalId);
  }

  private _onOpen(e: Event) {
    this._startHeartBeat();
    if (this._ws.onopen) {
      this._ws.onopen(e);
    }
  }

  private _onClose(e: CloseEvent) {
    this._stopHeartBeat();

    if (this._ws.onclose) {
      this._ws.onclose(e);
    }
  }

  private _onError(e: ErrorEvent) {
    this._stopHeartBeat();

    if (this._ws.onerror) {
      this._ws.onerror(e);
    }
  }

  private _onmessage(e: MessageEvent) {
    const message = JSON.parse(e.data);

    switch (message.type) {
      case 'PONG':
        clearTimeout(this._pongCheckingIntervalId);
        break;

      default:
        if (this._ws.onmessage) {
          this._ws.onmessage({ ...e, data: message });
        }
    }
  }

  private _log(message: string) {
    if (this._options.debug) {
      console.debug(message);
    }
  }

  public send(data: any) {
    this._ws.send(JSON.stringify(data));
  }
}

export default GatguWebSocket;
