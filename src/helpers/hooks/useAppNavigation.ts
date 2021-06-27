import { NavigationProp, useNavigation } from '@react-navigation/core';

import { TAppStackParamList } from '@/App.router';

export const useAppNavigation: () => NavigationProp<TAppStackParamList> = () => {
  return useNavigation();
};
