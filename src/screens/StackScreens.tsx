import React, { useCallback, useState } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Icon } from 'native-base';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Logo from '@/assets/Logo';
import { Button } from '@/components';
import routes from '@/helpers/routes';
import { RootState } from '@/store';
import { logout } from '@/store/userSlice';
import { palette, typo } from '@/styles';

import DrawerTemplate from './Drawer';

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

const Drawer = createDrawerNavigator();
function ArticleDrawer(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContent={(props) => <DrawerTemplate {...props} />}
      drawerStyle={{ width: '57%' }}
    >
      <Drawer.Screen name={Article.name} component={Article.component} />
      {/* 
        TODO: @juimdpp 
          Add this screen: 
        <Drawer.Screen name="ArticleEdit" component={ArticleEditScreen} /> 
      */}
    </Drawer.Navigator>
  );
}

const HomeStack = createStackNavigator();
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

// FIXME: @woohm402
//   todo: 그때 말했던 폴더 구조 관련된 큰 체인지가 필요해 보입니다
//         일단 어디로든 옮겨질 파일이라 생각하고 여러 군데 흩뿌려놓으면 나중에 찾기 힘드니까 여기다 다 몰아놓을게요
//         현재 더보기창 디자인도 진행중인 관계로 정확하게 디자인하진 않겠습니당
//   when: 폴더 구조 회의 완료되면
const ProfileStack = createStackNavigator();
function ProfileStackScreen(): JSX.Element {
  const [show, setShow] = useState(false);
  const logged = useSelector((state: RootState) => state.user.logged);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logoutReq = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const modifyReq = useCallback(() => {
    //
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
                  <Icon name="menu" />
                </TouchableHighlight>
                {show ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: 40,
                      width: 169,
                      right: 2,
                      backgroundColor: 'white',
                      height: 127,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: palette.borderGray,
                      paddingLeft: 33,
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <Button
                      title="수정하기"
                      textStyle={{
                        ...typo.bigTitle,
                      }}
                      onPress={() => navigation.navigate('ProfileModify')}
                    />
                    <Button
                      title="로그아웃하기"
                      textStyle={{
                        ...typo.bigTitle,
                      }}
                      onPress={logoutReq}
                    />
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
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <Button
              title="완료"
              onPress={() => {
                modifyReq();
              }}
            />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
}

const WriteArticleStack = createStackNavigator();
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
            // TODO: @juimdpp
            //  must modify;
            //  this does only routing but doesn't post article...
            <Button
              title="완료"
              // TODO: @juimdpp
              // todo: add styles
              // when: api 고칠 때...
              onPress={() => navigation.navigate('Article')}
            />
          ),
        }}
      />
    </WriteArticleStack.Navigator>
  );
}

const ChattingStack = createStackNavigator();
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

const SearchStack = createStackNavigator();
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

const SignUpStack = createStackNavigator();
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
