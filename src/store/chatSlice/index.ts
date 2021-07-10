import { AxiosResponse, AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chatAPI } from '@/apis';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { AppThunk } from '@/store';
import { IGetFailPayload } from '@/types/article';
import { IChattingListEntry, IChattingRoom } from '@/types/chat';

export interface IChatSlice {
  hasError: boolean;
  errorStatus: number;
  currentChatInfo: IChattingRoom;
  chattingListIsLoading: boolean;
  chattingListHasError: boolean;
  chattingListErrorStatus: number;
  chattingList: IChattingListEntry[];
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
  },
  chattingListIsLoading: true,
  chattingListHasError: false,
  chattingListErrorStatus: -100,
  chattingList: [],
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

    getChattingListLoading: (state) => {
      state.chattingListIsLoading = true;
      state.chattingList = [];
      state.chattingListHasError = false;
      state.chattingListErrorStatus = -100;
    },

    getChattingListSuccess: (
      state,
      { payload }: PayloadAction<IChattingListEntry[]>
    ) => {
      state.chattingList = payload;
      state.chattingListIsLoading = false;
      state.chattingListHasError = false;
      state.chattingListErrorStatus = -100;
    },

    getChattingListFail: (
      state,
      { payload }: PayloadAction<IGetFailPayload>
    ) => {
      state.chattingListIsLoading = false;
      state.chattingListErrorStatus = payload.errorStatus;
      state.chattingListHasError = true;
      state.chattingList = [];
    },
  },
});

const {
  setCurrentChatInfo,
  failSetCurrentChatInfo,
  getChattingListLoading,
  getChattingListSuccess,
  getChattingListFail,
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

export const changeOrderStatus = (
  id: number,
  orderStatus: number
): AppThunk => (dispatch) => {
  chatAPI
    .changeStatus(id, { order_status: orderStatus })
    .then((response: AxiosResponse) => {
      dispatch(setCurrentChatInfo(response.data)); // TODO: @juimdpp
      // todo: json server returns entire object, but backend returns status string --> must update to setOrderStatus(response.data)
      // when: 서버 잘 되면 (json-server에서는 저렇게 하는 수 밖에 없어서...)
    })
    .catch((err: AxiosError) => {
      console.log(err);
      // TODO: @juimdpp
      // todo: handle error
      // when: 로딩 페이지 구현할 때 같이 할게요
    });
};

export const getChattingList = (id: number): AppThunk => (dispatch) => {
  dispatch(getChattingListLoading());
  chatAPI
    .getMyChatList(id)
    .then((response: AxiosResponse) => {
      dispatch(getChattingListSuccess(response.data));
    })
    .catch((err: AxiosError) => {
      if (err.response) {
        dispatch(getChattingListFail({ errorStatus: err.response.status }));
      } else {
        dispatch(getChattingListFail({ errorStatus: UNKNOWN_ERR }));
      }
    });
};

export default chatSlice.reducer;
