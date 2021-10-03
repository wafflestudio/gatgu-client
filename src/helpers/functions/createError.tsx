import React from 'react';

import Error from '@/components/Error';
import defaultErrorMsg from '@/constants/ErrorCode';
import customObj from '@/helpers/functions/object';

interface IErrorMsg {
  [x: number]: string;
}

// status:number의 key와 msg 로 이루어진 프로퍼티를 가지는 obj를 parameter로 받음
// (status:number,callback:()=>void)=> <Error /> 와 errorMsg를 element로 가지는 배열을 return

/*
  <usage>

  const [Error, errorMsg] = createError({
    401: 'id 또는 password가 잘못되었습니다.',
  });

  const callback = () => {
    dispaatch(getArticleSummary);
  };

  hasError ? Error(401, callback) : <Component />;
*/

type TCreateError = (errMsg?: IErrorMsg) => TErrorReturn;
type TErrorReturn = [
  (status: number, errCallback: () => void) => JSX.Element,
  IErrorMsg
];

const createError: TCreateError = (customErrorMsg: IErrorMsg = {}) => {
  const errorMsg: IErrorMsg = defaultErrorMsg;
  customObj.entries(customErrorMsg).forEach(([status, msg]) => {
    errorMsg[status] = msg;
  });
  return [
    (status: number, errCallback: () => void) => (
      <Error errCallback={errCallback} />
    ),
    errorMsg,
  ] as TErrorReturn;
};

export default createError;
