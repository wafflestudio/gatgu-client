// import React from 'react';
// import {
//   createMaterialTopTabNavigator,
//   MaterialTopTabNavigationOptions,
// } from '@react-navigation/material-top-tabs';
// import { Icon } from 'native-base';

// import navigationRoute from './navigationRoute';

// const Tab = createMaterialTopTabNavigator();

// const {
//   Home,
//   ChattingList,
//   Profile,
//   WriteArticle,
//   AppLoading,
//   tarBarOption,
//   Article,
// } = navigationRoute;

// function BottomNavigation(): JSX.Element {
//   return (
//     <Tab.Navigator tabBarPosition="bottom" tabBarOptions={tarBarOption}>
//       <Tab.Screen
//         name={Home.name}
//         component={Home.component}
//         options={options[Home.name]}
//       />
//       {/* TODO: modify below to search screen */}
//       <Tab.Screen
//         name={AppLoading.name}
//         component={AppLoading.component}
//         options={options[AppLoading.name]}
//       />
//       <Tab.Screen
//         name={WriteArticle.name}
//         component={WriteArticle.component}
//         options={options[WriteArticle.name]}
//       />
//       <Tab.Screen
//         name={ChattingList.name}
//         component={ChattingList.component}
//         options={options[ChattingList.name]}
//       />
//       <Tab.Screen
//         name={Profile.name}
//         component={Profile.component}
//         options={options[Profile.name]}
//       />
//       {/* WILL REMOVE: temporarily added it to visualize layout without bothering myself with naviation*/}
//       <Tab.Screen
//         name={Article.name}
//         component={Article.component}
//         options={options[Article.name]}
//       />
//     </Tab.Navigator>
//   );
// }

// const options: { [x: string]: MaterialTopTabNavigationOptions } = {
//   Home: {
//     // eslint-disable-next-line react/display-name
//     tabBarIcon: ({ color }: any): JSX.Element => (
//       <Icon name="ios-home" style={{ color, fontSize: 25 }} />
//     ),
//   },
//   /* TODO: modify below to search screen */
//   AppLoading: {
//     // eslint-disable-next-line react/display-name
//     tabBarIcon: ({ color }: any): JSX.Element => (
//       <Icon name="ios-home" style={{ color, fontSize: 25 }} />
//     ),
//   },
//   WriteArticle: {
//     // eslint-disable-next-line react/display-name
//     tabBarIcon: ({ color }: any): JSX.Element => (
//       <Icon name="ios-book" style={{ color, fontSize: 25 }} />
//     ),
//   },
//   ChattingList: {
//     // eslint-disable-next-line react/display-name
//     tabBarIcon: ({ color }: any): JSX.Element => (
//       <Icon name="ios-heart" style={{ color, fontSize: 25 }} />
//     ),
//   },
//   Profile: {
//     // eslint-disable-next-line react/display-name
//     tabBarIcon: ({ color }: any): JSX.Element => (
//       <Icon name="ios-add-circle" style={{ color, fontSize: 25 }} />
//     ),
//   },
//   // WILL REMOVE: temporarily added it to visualize layout without bothering myself with naviation
//   Article: {
//     // eslint-disable-next-line react/display-name
//     tabBarIcon: ({ color }: any): JSX.Element => (
//       <Icon name="ios-alert" style={{ color, fontSize: 25 }} />
//     ),
//   },
// };

// export default BottomNavigation;
