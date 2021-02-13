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
  WriteArticle: {
    name: 'WriteArticle',
    component: WriteArticle,
  },
  Chatting: {
    name: 'Chatting',
    component: Chatting,
  },
  Profile: {
    name: 'Profile',
    component: Profile,
  },
};

export default routes;
