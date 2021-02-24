import { View, Text, ScrollView } from 'react-native';
import { Button } from '@/components';
import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { SignUpStackParamList } from '@/types/navigation';
import contents from './content';
import styles from './TOS.style';

interface TOSProps {
  title: string;
  isOptional: boolean;
  onPress: () => void;
}

function TOSTemplate(): JSX.Element {
  const route = useRoute<RouteProp<SignUpStackParamList, 'TOS'>>();
  const { title, isOptional, onPress }: TOSProps = route.params;

  const navigation = useNavigation();

  const confirm = () => {
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
      <Button
        style={styles.confirmBtn}
        textStyle={styles.confirmBtnText}
        title="동의하기"
        onPress={confirm}
      />
    </View>
  );
}

export default TOSTemplate;
