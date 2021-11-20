import { AxiosResponse, AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chatAPI } from '@/apis';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import { IGetFailPayload } from '@/types/article';
import { IChattingRoom } from '@/types/chat';
import { IChatUserProps } from '@/types/user';

export interface IChatSlice {
  hasError: boolean;
  errorStatus: number;
  currentChatInfo: IChattingRoom;
  participantsList: IChatUserProps[];
  toggleChatList: boolean;
  images: string[];
}

const initialState: IChatSlice = {
  hasError: false,
  errorStatus: -100,
  currentChatInfo: {
    id: 0,
    participant_profile: [],
    article: 0,
    order_status: 0,
    tracking_number: 0,
    // not in api
    uri: '',
    title: '',
    chat: '',
    time: 0,
    nickName: '',
    writer_id: 0,
  },
  participantsList: [],
  toggleChatList: false,
  images: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChatInfo: (state, { payload }: PayloadAction<IChattingRoom>) => {
      state.currentChatInfo = payload;
      state.hasError = false;
    },

    failSetCurrentChatInfo: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.hasError = true;
      state.errorStatus = payload.errorStatus;
    },

    setParticipantsList: (
      state,
      { payload }: PayloadAction<IChatUserProps[]>
    ) => {
      state.participantsList = payload;
    },

    setToggle: (state) => {
      state.toggleChatList = !state.toggleChatList;
    },
    setImagesUrls: (
      state,
      { payload }: PayloadAction<{ images: string[] }>
    ) => {
      state.images = payload.images;
    },
  },
});

const {
  setCurrentChatInfo,
  failSetCurrentChatInfo,
  setParticipantsList,
  setToggle,
  setImagesUrls,
} = chatSlice.actions;

// get chat info
export const getChatInfo = (id: number | undefined): AppThunk => (dispatch) => {
  chatAPI
    .getChatInfo(id)
    .then((response: AxiosResponse) => {
      dispatch(setCurrentChatInfo(response.data)); // TODO: @juimdpp
      // todo: change to response.data (json-server에서는 이렇게해야 커리가 먹힘)
      // when: 서버 잘 되면
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(failSetCurrentChatInfo({ errorStatus: err.response.status }));
      } else {
        dispatch(failSetCurrentChatInfo({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

export const changeOrderStatus = (id: number, payStatus: number): AppThunk => (
  dispatch
) => {
  chatAPI
    .changeParticipantStatus(id, { participant_id: id, pay_status: payStatus })
    .then((response: AxiosResponse) => {
      dispatch(setCurrentChatInfo(response.data)); // TODO: @juimdpp
      // todo: json server returns entire object, but backend returns status string --> must update to setOrderStatus(response.data)
      // when: 서버 잘 되면 (json-server에서는 저렇게 하는 수 밖에 없어서...)
    })
    .catch((err: AxiosError) => {
      console.error(err);
      // TODO: @juimdpp
      // todo: handle error
      // when: 로딩 페이지 구현할 때 같이 할게요
    });
};

export const fetchingParticipants = (roomId: number): AppThunk => (
  dispatch
) => {
  chatAPI
    .getChatParticipants(roomId)
    .then((response: AxiosResponse) => {
      dispatch(setParticipantsList(response.data));
    })
    .catch((err: AxiosError) => {
      console.error('FETCHING PARTICIPANTS', err);
    });
};

export const updateRoomImages = (roomId: number): AppThunk => (dispatch) => {
  chatAPI
    .getChatPictures(roomId)
    .then((res) => {
      dispatch(setImagesUrls({ images: res.data.map((img) => img.img_url) }));
    })
    .catch((err: AxiosError) => {
      console.error('get room images error', err);
    });
};

export const refetchChattingList = (): AppThunk => (dispatch) => {
  dispatch(setToggle);
};

export default chatSlice.reducer;
