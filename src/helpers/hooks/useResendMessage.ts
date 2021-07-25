/**
 * Send a message and retry up to 5 times until a success message is returned.
 * If a failure message is returned, immediately return failure.
 */
import { useState } from 'react';

import { DateTime } from 'luxon';

import { WSMessage } from '@/enums';

import GatguWebsocket from '../GatguWebsocket/GatguWebsocket';

interface IResendMessage {
  sendType: WSMessage;
  returnSuccessType: WSMessage;
  returnFailureType: WSMessage;
  // data: any;
  // timeoutHandler: any;
  resendKey: string;
  handleSuccess: any;
  handleFailure: any;
}

interface IObject {
  [key: string]: [number, number]; // [timeoutID, retry count]
}

interface IWSMessage {
  type: string;
  data: any;
  websocket_id: string;
}

export const ResendMessage = ({
  sendType,
  returnSuccessType,
  returnFailureType,
  resendKey,
  handleSuccess,
  handleFailure,
}: IResendMessage) => {
  const { sendWsMessage } = GatguWebsocket.useMessage();
  const [retryMap, setRetryMap] = useState<IObject>({});
  const firstSend = parseInt(resendKey) === -1;
  const key = firstSend ? `${DateTime.now()}` : resendKey;
  const [socket, setSocket] = useState({});
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);

  const SendMessage = (data: any): Promise<number> => {
    // set timeout
    const timeoutID = setTimeout(SendMessage, 2000, key);
    // map websocket_id to timeoutID and update count
    const tempMap = retryMap;
    tempMap[key] = firstSend
      ? [timeoutID, 1]
      : [timeoutID, tempMap[key][1] + 1];
    setRetryMap(tempMap);

    // if more than 5 retries
    // if (retryMap[key][1] > 5) {
    //     // clear timeout
    //     clearTimeout(retryMap[key][0]);

    //     // delete from map
    //     const tempMap = retryMap;
    //     delete tempMap[key];
    //     setRetryMap(tempMap);

    //     // reject
    //     return new Promise((resolve, reject) => {
    //         reject(-100)
    //     });
    // }

    // send websocket message to server
    sendWsMessage({
      type: sendType,
      data: data,
      websocket_id: key, // tempID used for internal purposes
    });

    //
    let succeed = false;
    GatguWebsocket.useMessage<IWSMessage>({
      onmessage: (socket) => {
        setSocket(socket);
        switch (socket.type) {
          case returnSuccessType: {
            // clear timeout
            clearTimeout(retryMap[socket.websocket_id][0]);
            const tempMap = retryMap;
            delete tempMap[socket.websocket_id];
            setRetryMap(tempMap);

            setSuccess(true);
            setFailure(false);
            succeed = true;
            break;
          }
          case returnFailureType: {
            // user function
            handleFailure();

            // clear timeout
            clearTimeout(retryMap[socket.websocket_id][0]);
            const tempMap = retryMap;
            delete tempMap[socket.websocket_id];
            setRetryMap(tempMap);

            setFailure(true);
            setSuccess(false);
            succeed = false;
            break;
          }
          default: {
            console.log('DEFAULT', socket);
            break;
          }
        }
      },
    });

    return new Promise((resolve, reject) => {
      if (succeed) resolve(100);
      else reject(-100);
    });
  };

  return {
    retryMap,
    key,
    sendMessage,
    socket,
    success,
    failure,
  };
};
