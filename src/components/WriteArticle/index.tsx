import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ScrollView, Button, View, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { AxiosResponse } from 'axios';

import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { articleAPI } from '@/apis';
import { Need } from '@/constants/Enum';
import tagNames from '@/constants/tagList';
import { createError } from '@/helpers/functions';
import { validateLink } from '@/helpers/functions/validate';
import { RootState } from '@/store';
import {
  createSingleArticle,
  editSingleArticle,
  getSingleArticle,
} from '@/store/articleSlice';
import { IArticleProps, ITagType } from '@/types/article';
import { EditArticleParamList } from '@/types/navigation';

import AddImage from './AddImage/AddImage';
import Description from './Description/Description';
import DueDate from './DueDate/DueDate';
import Link from './Link/Link';
import Location from './Location/Location';
import Recruiting from './Recruiting/Recruiting';
import Tags from './Tags/Tags';
import Title from './Title/Title';

// TODO: @juimdpp
// when: 엄청 급한게 아니라 모든 코드 마스터로 머지 되고, 다시 수정할때..?
//  - input 받을 때 인풋창 잘 보이게 (focus되게) 화면 조정
// when: 기획 잡히면:
//  - 위치 입력을 우편번호, 상세주소 형태로 받기 --> api
const [Error] = createError();
interface IWriteArticleProps {
  isEdit: boolean; // true: edit 창, false: write 창
}

const TagArray = tagNames.map((item, indx) => {
  return { id: indx, tag: item, selected: false };
});

function WriteArticleTemplate({ isEdit }: IWriteArticleProps): JSX.Element {
  const [images, setImages] = useState<(string | null | undefined)[]>([]);
  const [need_people, setPeople] = useState('');
  const [need_price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [selected, setSelected] = useState(Need.IS_PEOPLE); // IS_PEOPLE-1 because selector takes 0 or 1 not 1 or 2 as in API
  const [tags, toggleTags] = useState<ITagType[]>(TagArray);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EditArticleParamList, 'EditArticle'>>();
  const { id } = isEdit ? route.params : { id: 0 };
  const dispatch = useDispatch();
  const [pageStatus, setPageStatus] = useState(-100);
  const [hasError, setErrorStatus] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);

  // if edit, get article and send them to other subcomponents
  const currentArticle = useSelector((state: RootState) => {
    if (isEdit) return state.article.currentArticle;
    else return null;
  });
  const _pageStatus = useSelector((state: RootState) => {
    return state.article.WriteArticleErrorStatus;
  });
  const _errorState = useSelector((state: RootState) => {
    return state.article.WriteArticleHasError;
  });
  const _loadingStatus = useSelector((state: RootState) => {
    return state.article.WriteArticleIsLoading;
  });

  const handlePeople = (inp: string) => {
    if (inp === 'NaN') setPeople('');
    else setPeople(inp);
  };
  const handlePrice = (inp: string) => {
    if (inp === 'NaN') setPrice('');
    else setPrice(inp);
  };

  useEffect(() => {
    setPageStatus(_pageStatus);
    setErrorStatus(_errorState);
  }, [_pageStatus, _errorState]);

  useEffect(() => {
    setLoadingStatus(_loadingStatus);
  }, [_loadingStatus]);

  useEffect(() => {
    if (isEdit) dispatch(getSingleArticle(id));
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
          currentArticle.need_type === Need.IS_PEOPLE
            ? Need.IS_PEOPLE
            : Need.IS_MONEY
        );
      handlePeople(`${currentArticle.people_min}`);
      handlePrice(`${currentArticle.price_min}`);
      if (currentArticle.tag) {
        const temp = currentArticle.tag.map((i, num) => {
          return { id: i, tag: `${num}`, selected: false };
        });
        toggleTags(temp);
      }
    }
  }, [currentArticle]);

  const checkInput = (): string => {
    let str = '';
    if (!validateLink(link)) str += 'Link is invalid.\n';
    return str;
  };

  const submit = () => {
    const tempTags = tags
      .filter((item) => item.selected)
      .map((item) => item.id);

    const res = checkInput();
    if (res != '') {
      Alert.alert(res);
      return;
    }

    const tempArticle = {
      title: title,
      description: description,
      location: location,
      price_min: parseInt(need_price),
      people_min: parseInt(need_people),
      // time_in: new Date('2021-03-17'),
      // TODO: @juimdpp
      // todo: implement dueDate modal + 백엔드와 확인 (정확하게 원하는 타입이 무엇인지)
      // when: after I finish issue 166
      product_url: link,
      thumbnail_url: !images[0]
        ? 'https://trello.com/b/9EsYdmZU/team'
        : images[0],
      // image: images.slice(1),
      need_type: selected,
      // tag: tempTags
    } as IArticleProps;
    if (isEdit && currentArticle) {
      dispatch(editSingleArticle(id, tempArticle)).then((id: number) => {
        if (id != -1) {
          navigation.navigate('Article', {
            screen: 'ArticlePage',
            params: { id: id },
          });
        }
      });
    } else {
      dispatch(createSingleArticle(tempArticle)).then((id: number) => {
        if (id != -1) {
          navigation.navigate('Article', {
            screen: 'ArticlePage',
            params: { id: id },
          });
        }
      });
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => <Button title="완료" onPress={submit} />,
    });
  });

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {hasError ? (
        Error(pageStatus, () => {
          Alert.alert('Need to fix this part');
        })
      ) : isLoading ? (
        <Text>Loading Page</Text>
      ) : (
        <View>
          <Tags tags={tags} toggleTags={toggleTags} />
          <DueDate dueDate={dueDate} setDueDate={setDueDate} />
          <AddImage images={images} setImages={setImages} />
          <Title title={title} setTitle={setTitle} />
          <Recruiting
            needPeople={need_people}
            needPrice={need_price}
            selected={selected}
            setPeople={handlePeople}
            setPrice={handlePrice}
            setSelected={setSelected}
          />
          <Location location={location} setLocation={setLocation} />
          <Link link={link} setLink={setLink} />
          <Description
            description={description}
            setDescription={setDescription}
          />
        </View>
      )}
    </ScrollView>
  );
}

export default WriteArticleTemplate;
