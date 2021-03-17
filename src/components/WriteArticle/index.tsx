import React, { useEffect, useState } from 'react';
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
import { EditArticleParamList } from '@/types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getSingleArticle } from '@/store/articleSlice';
import { ITagType } from '@/types/article';
import { IS_MONEY, IS_PEOPLE } from '@/constants/Enum';
import { articleAPI } from '@/apis';
import { AxiosResponse } from 'axios';

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

function WriteArticleTemplate({ isEdit }: IWriteArticleProps): JSX.Element {
  const [images, setImages] = useState<(string | null | undefined)[]>([]);
  const [need_people, setPeople] = useState(0);
  const [need_price, setPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState(IS_PEOPLE - 1); // IS_PEOPLE-1 because selector takes 0 or 1 not 1 or 2 as in API
  const [tags, toggleTags] = useState<ITagType[]>(TagArray);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EditArticleParamList, 'EditArticle'>>();
  const { id } = isEdit ? route.params : { id: 0 };
  const dispatch = useDispatch();

  // TODO: @juimdpp
  // todo: if edit, get article and send them to other subcomponents
  const currentArticle = useSelector((state: RootState) => {
    if (isEdit) return state.article.currentArticle;
    else return null;
  });

  useEffect(() => {
    if (isEdit) dispatch(getSingleArticle(id));
    // handle error true case
  }, []);

  useEffect(() => {
    if (isEdit && currentArticle) {
      setTitle(currentArticle.title);
      setDescription(currentArticle.description);
      setLocation(currentArticle.location);
      currentArticle.product_url && setLink(currentArticle.product_url);
      if (currentArticle.thumbnail_url && currentArticle.image) {
        const tempImage = currentArticle.image.slice();
        tempImage.unshift(currentArticle.thumbnail_url);
        setImages(tempImage);
      }
      currentArticle.need_type &&
        setSelected(
          currentArticle.need_type === IS_PEOPLE ? IS_PEOPLE - 1 : IS_MONEY - 1
        );
      setPeople(currentArticle.people_min);
      setPrice(currentArticle.price_min);
      if (currentArticle.tag) {
        const temp = currentArticle.tag.map((i, num) => {
          return { id: i, tag: num.toString(), selected: false };
        });
        toggleTags(temp);
      }
    }
  }, [currentArticle]);

  const submit = () => {
    const tempTags = tags
      .filter((item) => item.selected)
      .map((item) => item.id);
    const tempArticle = {
      title: title,
      description: description,
      location: location,
      price_min: need_price,
      people_min: need_people,
      // time_in: new Date('2021-03-17'),
      // TODO: @juimdpp
      // todo: implement dueDate modal + 백엔드와 확인 (정확하게 원하는 타입이 무엇인지)
      // when: after I finish issue 166
      product_url: link,
      thumbnail_url: !images[0]
        ? 'https://trello.com/b/9EsYdmZU/team'
        : images[0],
      // image: images.slice(1),
      need_type: selected + 1,
      // tag: tempTags
    };
    if (isEdit && currentArticle) {
      articleAPI.editArticle(id, tempArticle).then((res: AxiosResponse) => {
        console.log(res.data);
        navigation.navigate('Article', { id: id });
      });
    } else {
      articleAPI.create(tempArticle).then((res: AxiosResponse) => {
        navigation.navigate('Article', res.data.id);
      });
    }
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
      <Link link={link} setLink={setLink} />
      <Description description={description} setDescription={setDescription} />
      <Button title="완료" onPress={submit} />
    </ScrollView>
  );
}

export default WriteArticleTemplate;
