// .replace(/\n|\r|\s*/g, "")

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Linking,
  Share,
  View,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import {makeImgPath, Movie, moviesApi, ReviewResponse, TV, tvApi} from '../api';
import Poster from '../components/Poster';
import LinearGradient from 'react-native-linear-gradient';
import {useQuery} from 'react-query';
import Loader from '../components/Loader';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import HMedia from '../components/HMedia';
import HList from '../components/HList';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  font-size: 36px;
  color: #fff;
  align-self: flex-end;
  width: 80%;
  font-weight: 500;
  margin-left: 15px;
`;
const Data = styled.View`
  padding: 0px 20px;
`;

const Overview = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;
const ShareText = styled.Text`
  color: #fff;
  font-size: 15px;
`;

const SimilarContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;
const ReviewContainer = styled.View`
  margin-left: 20px;
  width: 90%;
  border: 0.3px;
  border-radius: 3px;
  border-color: ${props => props.theme.textColor};
`;
const ReviewTextCon = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-top: 20px;
`;
const AuthorText = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const ReviewText = styled.Text`
  font-size: 13px;
  color: ${props => props.theme.textColor};
`;
const REviesRate = styled.Text`
  font-size: 15px;
  color: white;
`;
const HSeparator = styled.View`
  height: 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
  //Screnn1 : Tv 등등
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
// type DetailScreenProps = TabNavigatorScreenProps<RootStackParamList, "Detail">;
// RootStackParamList 의 Detail은 Tab, Stack의 name 과 component에 들어있는 스크린 이름
//type을 정해서 써줘야함

const Detail: React.FC<DetailScreenProps> = ({
  navigation: {setOptions},
  route: {
    // params: {originalTitle},
    params,
  },
}) => {
  // console.log(originalTitle);
  const isMovie = 'original_title' in params;

  const ShareMedia = async () => {
    // console.log(detailData);
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie
      ? `https://www.imdb.com/title/${detailData.imdb_id}/`
      : detailData.homepage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\n Check it out : ${homepage}`,
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        // url: isMovie
        //   ? `https://ww.imdb.com/title/${data.imdb_id}/`
        //   : data.homepage,
        // message: params.overview,
        url: homepage,
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={ShareMedia}>
      <ShareText>Share</ShareText>
    </TouchableOpacity>
  );

  const {isLoading: detailLoading, data: detailData} = useQuery(
    [isMovie ? 'movie' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail,
    // {enabled: isMovie ? 'original_title' in params : 'original_name' in params},
    // 아래는 들어온 데이터에 따라서 한개의 api만 호출 하려고 enabled 옵션을 사용했는데, 위같은 경우는 알아서 필요한 api를 호출하도록 처리 해놓았기 때문에 enabled 옵션이 필요하지 않다
    //origintal_title이 있으면 api를 활성화 시켜라!!
  );

  // console.log(params.id);
  const {isLoading: simliarLoading, data: similarData} = useQuery(
    [isMovie ? 'movieSimilar' : 'tvSimilar', params.id],
    isMovie ? moviesApi.similar : tvApi.similar,
  );

  // reviewData?.results.map(item => {
  //   console.log(item.author_details.rating);
  // });
  // 아래처럼 분리해서 사용 할 수 도 있고
  // const {isLoading: movieLoading, data: movieData} = useQuery(
  //   ['movies', params.id],
  //   moviesApi.detail,
  //   {enabled: 'original_title' in params},
  //   //origintal_title이 있으면 api를 활성화 시켜라!!
  // );
  // const {isLoading: tvLoading, data: tvData} = useQuery(
  //   ['tv', params.id],
  //   tvApi.detail,
  //   {enabled: 'original_name' in params},
  //   //original_name 있으면 api를 활성화 시켜라!!

  useEffect(() => {
    setOptions({
      // title: originalTitle,
      title: 'original_title' in params ? 'Movie' : 'TV show',
    });
  }, []);

  useEffect(() => {
    if (detailData) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [detailData]);

  const imgPath = makeImgPath(params.backdrop_path || '');

  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    await Linking.openURL(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background style={StyleSheet.absoluteFill} source={{uri: imgPath}} />
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          colors={['transparent', '#000000']}
          style={StyleSheet.absoluteFill}
        />

        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {detailLoading ? <Loader /> : null}
        {detailData?.videos?.results.slice(0, 5)?.map(video => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Entypo name="youtube" size={24} color="red" />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
      <SimilarContainer>
        <HList
          title={isMovie ? 'Similar Movies' : 'Similar TV'}
          data={similarData?.results}
        />
      </SimilarContainer>
    </Container>
  );
};

export default Detail;
