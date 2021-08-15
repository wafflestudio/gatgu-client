import { asyncStoragekey } from '@/constants/asyncStorage';
import { IRecentMessageIdOfRoom } from '@/types/chat';

import { ObjectStorage } from './asyncStorage';

const getKey = (roomId: number) =>
  asyncStoragekey.RECENT_MESSAGE_OF_ROOM + `${roomId}`;

export const storeRecentlyReadMessageId = (
  roomId: number,
  messageId: number
) => {
  ObjectStorage.addObject(getKey(roomId), { id: messageId });
};

export const getRecentlyReadMessageId = async (roomId: number) => {
  const res = await ObjectStorage.getObject<IRecentMessageIdOfRoom>(
    getKey(roomId)
  );

  return res?.id;
};

export const removeRecentlyReadMessageId = (roomId: number) => {
  ObjectStorage.removeObject(getKey(roomId));
};
