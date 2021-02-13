import { WriteArticle, Chatting, Home, Profile } from '@/screens';

const routes = {
  tarBarOption: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    indicatorStyle: {
      backgroundColor: 'white',
    },
    style: {
      height: 60,
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
  WriteArticle: {
    name: 'WriteArticle',
    component: WriteArticle,
  },
};

export default routes;
