import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { Image, View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { AppRoutes } from '@/helpers/routes';
import { EUserStackScreens } from '@/screens/UserStack/UserStack';
import { typo } from '@/styles';
import { IUserSimple } from '@/types/user';

import styles from './Profile.style';

type IProfileBoxProps = Pick<IUserSimple, 'id' | 'picture' | 'nickname'>;

function ProfileBox({ id, picture, nickname }: IProfileBoxProps): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.profile}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(AppRoutes.UserStack, {
            screen: EUserStackScreens.Profile,
            params: { id: id },
          })
        }
      >
        <Image
          alt="profile"
          source={
            picture?.includes('http')
              ? {
                  uri: picture,
                }
              : require('@/assets/images/defaultProfile.png')
          }
          fallbackSource={require('@/assets/images/defaultProfile.png')}
          defaultSource={require('@/assets/images/defaultProfile.png')}
          style={styles.profileImg}
        />
      </TouchableOpacity>
      <Text style={{ ...typo.semiTitle }}>{nickname}</Text>
    </View>
  );
}
export default ProfileBox;
