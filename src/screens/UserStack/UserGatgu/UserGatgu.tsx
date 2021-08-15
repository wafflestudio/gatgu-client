import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBarProps } from 'react-native-tab-view';
import { TabBar } from 'react-native-tab-view';

import { UserArticleActivity } from '@/enums';
import { palette } from '@/styles';

import UserGatguList from './UserGatguList';

const UserGatgu: React.FC = () => {
  const participatedRoute = () => (
    <UserGatguList type={UserArticleActivity.Participated} />
  );
  const hostedRoute = () => <UserGatguList type={UserArticleActivity.Hosted} />;

  const renderScene = SceneMap({
    participatedRoute,
    hostedRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'participatedRoute', title: '내가 참여한 같구' },
    { key: 'hostedRoute', title: '내가 모집한 같구' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={palette.dark}
      inactiveColor={palette.dark}
      indicatorStyle={{ backgroundColor: palette.blue }}
      style={{ backgroundColor: palette.white }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default UserGatgu;
