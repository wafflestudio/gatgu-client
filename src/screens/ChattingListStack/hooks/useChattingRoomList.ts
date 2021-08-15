import React, { useState } from 'react';

import debounce from 'lodash/debounce';

import { chatAPI } from '@/apis';
import { IChatListSinglePreview } from '@/types/chat';

const useChattingRoomList = () => {
  const [items, setItems] = useState<IChatListSinglePreview[]>([]);

  /**
   * get lastest chatting rooms and update chatting Room
   */
  const updateChattingRoomList = React.useCallback(async () => {
    try {
      const res = await chatAPI.getMyChattingList();

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
    }
  }, []);

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
    updateChattingRoomList: debouncedUpdateChattingRoomList,
  };
};

export default useChattingRoomList;
