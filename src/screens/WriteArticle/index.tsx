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
import { articleAPI } from '@/apis';
import { ITagType } from '@/types/article';
import { AxiosResponse } from 'axios';

// TODO: @juimdpp
//  - circle css 하나로 합치기 (페이지 번호)
//  - add code for deleting all non numeric for people, price
//  - 위치 입력을 우편번호, 상세주소 형태로 받기 --> api
//  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정
//  - tag 정보 넘기기 (submit할때)
//  - Add props to redirection

const TagArray = [
  { id: 1, tag: '운동', selected: false },
  { id: 2, tag: '음식', selected: false },
  { id: 3, tag: '가구', selected: false },
  { id: 4, tag: '컴공', selected: false },
  { id: 5, tag: '기계', selected: false },
  { id: 6, tag: '전기', selected: false },
  { id: 7, tag: '방탄', selected: false },
  { id: 8, tag: '엑소', selected: false },
  { id: 9, tag: '빅뱅', selected: false },
];

function WriteArticleTemplate(): JSX.Element {
  const [images, setImages] = useState<(string | null | undefined)[]>([]);
  const [need_people, setPeople] = useState(0);
  const [need_price, setPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState(0);
  const [tags, toggleTags] = useState<ITagType[]>(TagArray);
  const navigation = useNavigation();

  const submit = () => {
    const tagNums = tags.map((tag) => tag.id);
    articleAPI
      .create({
        title: title,
        description: description,
        product_url: link,
        location: location,
        tag: tagNums,
        price_min: need_price,
        people_min: need_people,
        time_in: '2021-03-20', // TODO: @juimdpp
        // todo: change
        // when: design 나오면...?
        participants_summary: {
          count: 0,
          price: 0, // TODO: @juimdpp
          // todo: input으로 받기 (add useState)
          // when: 모집금액 / 필요금액 둘 다 인풋으로 받을 경우 (기획이 기억이 안 남...)
        },
        need_type: selected,
        thumbnail_url: images[0],
        image: images.slice(1),
      })
      .then((res: AxiosResponse) => {
        // TODO: @juimdpp
        // todo: res에서 만들어진 id를 props으로 넘겨줌
        // when: 서버 잘 될 때
        navigation.navigate('Article');
      });
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Tags tags={tags} toggleTags={toggleTags} />
      <AddImage images={images} setImages={setImages} />
      <Title title={title} setTitle={setTitle} />
      <Recruiting
        needPeople={need_people}
        needPrice={need_price}
        selected={selected}
        setPeople={setPeople}
        setPrice={setPrice}
        setSelected={setSelected}
      />
      <Location location={location} setLocation={setLocation} />
      <Description description={description} setDescription={setDescription} />
      <Link link={link} setLink={setLink} />
      <Button title="완료" onPress={submit} />
    </ScrollView>
  );
}

export default WriteArticleTemplate;
