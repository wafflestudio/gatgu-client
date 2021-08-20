import { useQuery, UseQueryOptions } from 'react-query';

import { getMyData } from '@/apis/UserApi';
import { USER_DETAIL } from '@/queryKeys';
import { IUserDetail } from '@/types/user';

import useSelector from '../useSelector';

export const useUserDetail = (options?: UseQueryOptions<IUserDetail>) => {
  const isLogined = useSelector((state) => state.user.isLogined);

  return useQuery<IUserDetail>(
    [USER_DETAIL],
    () => getMyData().then((response) => response.data),
    { ...options, enabled: isLogined }
  );
};
