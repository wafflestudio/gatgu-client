import React, { useState } from 'react';
import { ScrollView, Button } from 'react-native';
import Tags from './Tags/Tags';
import AddImage from './AddImage/AddImage';
import Title from './Title/Title';
import Link from './Link/Link';
import Description from './Description/Description';
import Location from './Location/Location';
import Recruiting from './Recruiting/Recruiting';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';

// TODO: @juimdpp
//  - circle css 하나로 합치기 (페이지 번호)
//  - add code for deleting all non numeric for people, price
//  - 위치 입력을 우편번호, 상세주소 형태로 받기 --> api
//  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정
//  - tag 정보 넘기기 (submit할때)
//  - Add props to redirection

interface IWriteArticleProps {
  isEdit: boolean; // true: edit 창, false: write 창
}

function WriteArticleTemplate({ isEdit }: IWriteArticleProps): JSX.Element {
  const [images, setImages] = useState<(string | null | undefined)[]>([]);
  const [need_people, setPeople] = useState('');
  const [need_price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const navigation = useNavigation();
  // const route = useRoute<RouteProp<ArticleDrawerParamList, 'ArticlePage'>>();
  // const id = route.params.id;
  // TODO: @juimdpp
  // todo: if edit, get article and send them to other subcomponents

  const submit = () => {
    // TODO: @juimdpp
    // todo: 아래 함수 제대로 구현
    // when: api 고칠 때

    /*articleAPI
      .create({
        // etc
      })
      .then(() => {
        // navigation.navigate('Article')
      });*/

    navigation.navigate('Article');
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Tags />
      <AddImage images={images} setImages={setImages} />
      <Title title={title} setTitle={setTitle} />
      <Recruiting
        needPeople={need_people}
        needPrice={need_price}
        setPeople={setPeople}
        setPrice={setPrice}
      />
      <Location location={location} setLocation={setLocation} />
      <Link link={link} setLink={setLink} />
      <Description description={description} setDescription={setDescription} />
      <Button title="완료" onPress={submit} />
    </ScrollView>
  );
}

export default WriteArticleTemplate;
