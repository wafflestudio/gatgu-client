import { AxiosResponse, AxiosError } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chatAPI } from '@/apis';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { initialChatInfo } from '@/constants/InitialState';
import { AppThunk } from '@/store';
import { IGetFailPayload } from '@/types/article';
import { IChattingRoom, IChangeStatusProps } from '@/types/chat';

export interface IChatSlice {
  hasError: boolean;
  errorStatus: number;
  currentChatInfo: IChattingRoom;
}

const initialState: IChatSlice = {
  hasError: false,
  errorStatus: -100,
  currentChatInfo: initialChatInfo,
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

    setOrderStatus: (state, { payload }: PayloadAction<IChangeStatusProps>) => {
      // TODO: @juimdpp
      // todo: implement this function that updates order status of state
      // when: 서버 잘 되면
    },
  },
});

const { setCurrentChatInfo, failSetCurrentChatInfo } = chatSlice.actions;

// get chat info
export const getChatInfo = (id: number | undefined): AppThunk => (dispatch) => {
  chatAPI
    .getChatInfo(id)
    .then((response: AxiosResponse) => {
      dispatch(setCurrentChatInfo(response.data[0])); // TODO: @juimdpp
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
    .changeStatus(id, { orderStatus: orderStatus })
    .then((response: AxiosResponse) => {
      dispatch(setCurrentChatInfo(response.data)); // TODO: @juimdpp
      // todo: json server returns entire object, but backend returns status string --> must update to setOrderStatus(response.data)
      // when: 서버 잘 되면 (json-server에서는 저렇게 하는 수 밖에 없어서...)
    })
    .catch(() => {
      // TODO: @juimdpp
      // todo: handle error
      // when: 로딩 페이지 구현할 때 같이 할게요
    });
};

export default chatSlice.reducer;
