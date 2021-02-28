import React, { useCallback, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { TouchableHighlight, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import routes from '@/helpers/routes';
import { Icon } from 'native-base';
import { Button } from '@/components';
import DrawerTemplate from './Drawer';

import { logout } from '@/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Logo from '@/assets/Logo';

const {
  Home,
  Notification,
  Article,
  Profile,
  WriteArticle,
  ChattingList,
  Search,
  SearchedArticle,
  ProfileModify,
  SignUp,
  TOS,
} = routes;

// TODO: 이거 여기서 정의하는 거보다 각 function 안에서 정의하는 게 낫지 않을까요
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChattingStack = createStackNavigator();
const WriteArticleStack = createStackNavigator();
const SearchStack = createStackNavigator();
const SignUpStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ArticleDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
    >
      <Drawer.Screen name={Article.name} component={Article.component} />
      {/* TODO: Add this screen: 
      <Drawer.Screen name="ArticleEdit" component={ArticleEditScreen} /> */}
    </Drawer.Navigator>
  );
}

function HomeStackScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={Home.name}
        component={Home.component}
        options={{
          // eslint-disable-next-line react/display-name
          headerTitle: () => (
            <Logo.subLogo style={{ width: 94.4, height: 30 }} />
          ),
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <TouchableHighlight
              onPress={() => navigation.navigate('Notification')}
            >
              <Icon type={'Ionicons'} name="ios-notifications-outline" />
            </TouchableHighlight>
          ),
          headerRightContainerStyle: { paddingRight: 10, paddingTop: 5 },
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name={Notification.name}
        component={Notification.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <HomeStack.Screen
        name="Article"
        component={ArticleDrawer}
        options={{
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <TouchableHighlight
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Icon name="menu" />
            </TouchableHighlight>
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}

// FIXME: 그때 말했던 폴더 구조 관련된 큰 체인지가 필요해 보입니다
//  일단 어디로든 옮겨질 파일이라 생각하고 여러 군데 흩뿌려놓으면 나중에 찾기 힘드니까 여기다 다 몰아놓을게요
//  현재 더보기창 디자인도 진행중인 관계로 정확하게 디자인하진 않겠습니당
function ProfileStackScreen(): JSX.Element {
  const [show, setShow] = useState(false);
  const logged = useSelector((state: RootState) => state.user.logged);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutReq = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={Profile.name}
        component={Profile.component}
        options={{
          title: '더보기',
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/display-name
          headerRight: () =>
            logged ? (
              <View style={{ position: 'relative' }}>
                <TouchableHighlight onPress={() => setShow(!show)}>
                  <Icon name="more" />
                </TouchableHighlight>
                {show ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: 50,
                      width: 100,
                      left: -100,
                      backgroundColor: 'white',
                      height: 50,
                    }}
                  >
                    <Button
                      title="수정 창으로"
                      onPress={() => navigation.navigate('ProfileModify')}
                    />
                    <Button title="로그아웃하기" onPress={logoutReq} />
                  </View>
                ) : null}
              </View>
            ) : null,
        }}
      />
      <ProfileStack.Screen
        name={ProfileModify.name}
        component={ProfileModify.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </ProfileStack.Navigator>
  );
}

function WriteArticleStackScreen(): JSX.Element {
  const navigation = useNavigation();

  return (
    <WriteArticleStack.Navigator>
      <WriteArticleStack.Screen
        name={WriteArticle.name}
        component={WriteArticle.component}
        options={{
          headerTitleAlign: 'center',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            // TODO: must modify; this does only routing but doesn't post article...
            <Button
              title="완료"
              onPress={() => navigation.navigate('Article')}
            />
          ),
        }}
      />
    </WriteArticleStack.Navigator>
  );
}

function ChattingStackScreen(): JSX.Element {
  return (
    <ChattingStack.Navigator>
      <ChattingStack.Screen
        name={ChattingList.name}
        component={ChattingList.component}
        options={{
          headerTitleAlign: 'center',
        }}
      />
    </ChattingStack.Navigator>
  );
}

function SearchStackScreen(): JSX.Element {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name={Search.name}
        component={Search.component}
        options={{
          title: '검색',
          headerTitleAlign: 'center',
        }}
      />
      <SearchStack.Screen
        name={SearchedArticle.name}
        component={SearchedArticle.component}
        options={{
          title: '검색결과',
          headerTitleAlign: 'center',
        }}
      />
    </SearchStack.Navigator>
  );
}

function SignUpStackScreen(): JSX.Element {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name={SignUp.name}
        component={SignUp.component}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
        }}
      />
      <SignUpStack.Screen
        name={TOS.name}
        component={TOS.component}
        options={{
          title: '약관 동의',
          headerTitleAlign: 'center',
        }}
      />
    </SignUpStack.Navigator>
  );
}

export {
  HomeStackScreen,
  ProfileStackScreen,
  WriteArticleStackScreen,
  ChattingStackScreen,
  SearchStackScreen,
  SignUpStackScreen,
};
