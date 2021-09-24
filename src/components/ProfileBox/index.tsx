import React from 'react';
import { TouchableOpacity } from 'react-native';

import { HStack, Image, View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@/helpers/hooks';
import { useUserDetail } from '@/helpers/hooks/api';
import { AppRoutes } from '@/helpers/routes';
import { ESubStackScreens } from '@/screens/SubStack/SubStack';
import { EUserStackScreens } from '@/screens/UserStack/UserStack';
import { IUserSimple } from '@/types/user';

import { GText } from '../Gatgu';
import styles from './Profile.style';

type IProfileBoxProps = Pick<IUserSimple, 'id' | 'picture' | 'nickname'>;

function ProfileBox({ id, picture, nickname }: IProfileBoxProps): JSX.Element {
  const navigation = useNavigation();

  const { data: currentUser } = useUserDetail();
  const isLogined = useSelector((state) => state.user.isLogined);

  const handleProfilePress = () => {
    if (currentUser?.id !== id) {
      navigation.navigate('SubStack', {
        screen: ESubStackScreens.UserProfile,
        params: { id: id },
      });

      return;
    }

    navigation.navigate(AppRoutes.UserStack, {
      screen: EUserStackScreens.Profile,
      params: { id: id },
    });
  };

  const renderProfileContent = () => {
    return (
      <HStack alignItems="center">
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
        <GText size={16}>{nickname}</GText>
      </HStack>
    );
  };

  return (
    <View style={styles.profile}>
      {isLogined ? (
        <TouchableOpacity onPress={handleProfilePress}>
          {renderProfileContent()}
        </TouchableOpacity>
      ) : (
        renderProfileContent()
      )}
    </View>
  );
}
export default ProfileBox;
