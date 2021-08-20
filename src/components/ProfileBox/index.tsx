import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Image, View } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@/helpers/hooks';
import { AppRoutes } from '@/helpers/routes';
import { EUserStackScreens } from '@/screens/UserStack/UserStack';
import { IUserSimple } from '@/types/user';

import { GText } from '../Gatgu';
import styles from './Profile.style';

type IProfileBoxProps = Pick<IUserSimple, 'id' | 'picture' | 'nickname'>;

function ProfileBox({ id, picture, nickname }: IProfileBoxProps): JSX.Element {
  const navigation = useNavigation();

  const isLogined = useSelector((state) => state.user.isLogined);

  const renderProfileContent = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <View style={styles.profile}>
      {isLogined ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(AppRoutes.UserStack, {
              screen: EUserStackScreens.Profile,
              params: { id: id },
            })
          }
        >
          {renderProfileContent()}
        </TouchableOpacity>
      ) : (
        renderProfileContent()
      )}
    </View>
  );
}
export default ProfileBox;
