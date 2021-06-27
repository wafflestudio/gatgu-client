import { NavigationProp, useNavigation } from '@react-navigation/core';

import { TAppStackParamList } from '@/App.router';

export const useAppNavigation = () => {
  return useNavigation() as NavigationProp<TAppStackParamList>;
};
