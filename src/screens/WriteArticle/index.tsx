import React, { useState } from 'react';
import { ScrollView, Button } from 'react-native';
import Header from '@/components/Header';
import { articleAPI } from '@/apis';
import Tags from './Tags/Tags';
import AddImage from './AddImage/AddImage';
import Title from './Title/Title';
import Link from './Link/Link';
import Description from './Description/Description';
import Location from './Location/Location';
import Recruiting from './Recruiting/Recruiting';
import { useNavigation } from '@react-navigation/native';

// TODO:
//  - circle css 하나로 합치기 (페이지 번호)
//  - add code for deleting all non numeric for people, price
//  - 위치 입력을 우편번호, 상세주소 형태로 받기 --> api
//  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정
//  - tag 정보 넘기기 (submit할때)
//  - Add props to redirection

const dummyImage = 'https://reactnative.dev/img/tiny_logo.png';

interface IDProps {
  org: string;
  repo: string;
  issueId: number;
  showIssuesList: () => void;
}

function WriteArticleTemplate(): JSX.Element {
  const [images, setImages] = useState<string[]>(['']);
  const [need_people, setPeople] = useState('');
  const [need_price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const navigation = useNavigation();

  const submit = () => {
    const people_count = parseInt(need_people);
    const price = parseInt(need_price);
    const product_url = link;
    const thumbnail_url = images;
    const temp_author_id = 0;

    articleAPI
      .create({
        title,
        people_count,
        price,
        location,
        description,
        product_url,
        // thumbnail_url,
        temp_author_id,
      })
      .then(() => {
        // TODO: redirect
      });
    navigation.navigate('Article');
  };
  // change
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Header title="글 쓰기" left={true} right={false} />
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
