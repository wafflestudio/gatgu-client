import { useQuery } from 'react-query';

import { getMyData } from '@/apis/UserApi';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

export const useUserDetail = () => {
  return useQuery<IUserDetail>([USER_DETAIL], () =>
    getMyData().then((response) => response.data)
  );
};
