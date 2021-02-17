const defaultErrorMsg = {
  400: '서버에 잘못된 요청을 보내고 있습니다',
  401: '인증되지 않은 사용자입니다',
  403: '접근 권한을 가지고 있지 않습니다',
  404: '해당 게시물은 존재하지 않습니다',
  500: '서버에 문제가 있습니다. 잠시 후에 다시 시도해주세요',
  502: '서버에 문제가 있습니다. 잠시 후에 다시 시도해주세요',
};

export const UNKNOWN_ERR = -100;

export default defaultErrorMsg;
