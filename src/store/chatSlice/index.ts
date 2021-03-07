import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chatAPI } from '@/apis';
import { AppThunk } from '@/store';
import { AxiosResponse, AxiosError } from 'axios';
import { IChattingRoom, IChangeStatusProps } from '@/types/chat';
import { IGetFailPayload } from '@/types/article';
import { UNKNOWN_ERR } from '@/constants/ErrorCode';
import { initialChatInfo } from '@/constants/InitialState';

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

    _changeOrderStatus: (
      state,
      { payload }: PayloadAction<IChangeStatusProps>
    ) => {
      // TODO(KIM): update order status
    },
  },
});

const { setCurrentChatInfo, failSetCurrentChatInfo } = chatSlice.actions;

// get chat info
export const getChatInfo = (id: number): AppThunk => (dispatch) => {
  chatAPI
    .getChatInfo(id)
    .then((response: AxiosResponse) => {
      dispatch(setCurrentChatInfo(response.data[0])); // TODO(KIM): change to response.data (json-server에서는 이렇게해야 커리가 먹힘)
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
      dispatch(setCurrentChatInfo(response.data)); // TODO(KIM): json server returns entire object, but backend returns status string --> must update to _changeOrderStatus(response.data)
    })
    .catch((err: AxiosError) => {
      console.log(err);
      // handle error
    });
};

export default chatSlice.reducer;
