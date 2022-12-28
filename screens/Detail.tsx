import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Linking} from 'react-native';
import styled from 'styled-components/native';
import {makeImgPath, Movie, moviesApi, TV, tvApi} from '../api';
import Poster from '../components/Poster';
import LinearGradient from 'react-native-linear-gradient';
import {useQuery} from 'react-query';
import Loader from '../components/Loader';
import WebView from 'react-native-webview';
import Entypo from 'react-native-vector-icons/Entypo';

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
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

// const Detail = (props) => {
//   console.log(props); 안에 들어있는 모든게 나옴, navigation, funtion..., 등
// const Detail = ({navigation,...rest}) => {
//   console.log(rest); // 파라미터 전체가 나오고

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
  const {isLoading, data} = useQuery(
    [isMovie ? 'movie' : 'tv', params.id],
    isMovie ? moviesApi.detail : tvApi.detail,
    // {enabled: isMovie ? 'original_title' in params : 'original_name' in params},
    // 아래는 들어온 데이터에 따라서 한개의 api만 호출 하려고 enabled 옵션을 사용했는데, 위같은 경우는 알아서 필요한 api를 호출하도록 처리 해놓았기 때문에 enabled 옵션이 필요하지 않다
    //origintal_title이 있으면 api를 활성화 시켜라!!
  );

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
          style={StyleSheet.absoluteFill}></LinearGradient>

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
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map(video => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
