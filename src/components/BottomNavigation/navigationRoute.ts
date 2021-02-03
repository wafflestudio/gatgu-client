import { Chatting, Home, Profile } from '@/screens';

export default {
  tarBarOption: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    indicatorStyle: {
      backgroundColor: 'white',
    },
  },
  Home: {
    name: 'Home',
    component: Home,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
  },
  Chatting: {
    name: 'Chatting',
    component: Chatting,
  },
};
