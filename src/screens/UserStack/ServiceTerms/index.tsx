import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '@/components';
import { GButton } from '@/components/Gatgu/GButton';
import { SignUpStackParamList } from '@/types/navigation';

import styles from './TOS.style';
import contents from './content';

interface IServiceTerms {
  title: string;
  isOptional: boolean;
  checked: boolean;
  onPress: () => void;
}

const ServiceTerms: React.FC<IServiceTerms> = () => {
  const route = useRoute<RouteProp<SignUpStackParamList, 'TOS'>>();
  const { title, checked, isOptional, onPress }: IServiceTerms = route.params;

  const navigation = useNavigation();

  const confirm = () => {
    if (checked) return;
    navigation.goBack();
    onPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{title}</Text>
        {isOptional ? (
          <Text style={styles.titleOptional}>(선택)</Text>
        ) : (
          <Text style={styles.titleMandatory}>(필수)</Text>
        )}
      </View>
      <ScrollView style={styles.contentView}>
        <Text style={styles.contentText}>{contents[title]}</Text>
      </ScrollView>
      <GButton size="small" onPress={confirm}>
        동의하기
      </GButton>
    </View>
  );
};

export default ServiceTerms;
