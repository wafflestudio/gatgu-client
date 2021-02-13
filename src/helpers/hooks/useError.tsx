import React, { useCallback } from 'react';
import { customObj } from '@/helpers/functions';
import Error from '@/components/Error';
import defaultErrorMsg from '@/constants/Error';

interface IErrorMsg {
  [x: number]: string;
}

// status:number의 key와 msg 로 이루어진 프로퍼티를 가지는 obj를 parameter로 받음
// (status:number)=> <Error /> 와 errorMsg를 return 함

/*
  Usage
  const [Error,errorMsg] = useError({401:"id 또는 password가 잘못되었습니다."});
  {hasError?Error(Errorcode):<Component />} 

*/

const useError = (customErrorMsg: IErrorMsg = {}) =>
  useCallback(() => {
    const errorMsg: IErrorMsg = defaultErrorMsg;
    customObj
      .entries(customErrorMsg)
      .forEach(([status, msg]) => (errorMsg[status] = msg));
    return [(status: number) => <Error status={status} />, errorMsg];
  }, [])();

export default useError;