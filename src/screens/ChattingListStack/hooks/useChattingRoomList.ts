import React, { useState } from 'react';

import debounce from 'lodash/debounce';

import { chatAPI } from '@/apis';
import { IChatListSinglePreview } from '@/types/chat';

const useChattingRoomList = () => {
  const [items, setItems] = useState<IChatListSinglePreview[]>([]);

  const [offset, setOffset] = useState(0);

  const [isLoading, setLoading] = React.useState(true);

  const [count, setCount] = React.useState(0);

  /**
   * get lastest chatting rooms and update chatting Room
   */
  const updateChattingRoomList = React.useCallback(
    async (type: 'first' | 'next' = 'first') => {
      if (type === 'next' && offset >= count) {
        return;
      }

      if (type === 'first') {
        setLoading(true);
      }

      try {
        const res = await chatAPI.getMyChattingList(
          type === 'first' ? 0 : offset
        );

        setCount(res.data.count);

        setItems((prev) => {
          const roomIdSet = new Set();
          const chattingRooms = [...res.data.results, ...prev];

          return (
            chattingRooms
              // sort based on send_at timestamp
              .sort((a, b) => {
                if (!a.recent_message?.sent_at) return 1;
                if (!b.recent_message?.sent_at) return -1;

                return -a.recent_message.sent_at + b.recent_message.sent_at;
              })
              // filter same room
              .filter((room) => {
                if (roomIdSet.has(room.id)) return false;

                roomIdSet.add(room.id);
                return true;
              })
          );
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [offset, count]
  );

  React.useEffect(() => {
    setOffset(items.length);
  }, [items]);

  /**
   * debounced get chatting room list
   */
  const debouncedUpdateChattingRoomList = debounce(
    updateChattingRoomList,
    200,
    {
      maxWait: 400,
    }
  );

  return {
    items,
    isLoading,
    setLoading,
    updateChattingRoomList: debouncedUpdateChattingRoomList,
  };
};

export default useChattingRoomList;
