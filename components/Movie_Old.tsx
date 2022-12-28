/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {API_URL, makeImgPath, TRENDING_URL, UPCOMING_URL} from '../api';
import {BlurView} from '@react-native-community/blur';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import Poster from './Poster';
import Slide from './Slide';

const Container = styled.ScrollView`
  /* background-color: ${props => props.theme.mainBgColor}; */
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: ${props => props.theme.mainBgColor}; */
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const TrendScroll = styled.FlatList`
  margin-top: 20px;
`;
const TrendMovie = styled.View`
  margin-right: 30px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movie = ({navigation: {navigate}}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  // const getNowPlaying2 = async () => {
  //   const response = await fetch(API_URL);
  //   const json = await response.json();
  // };
  const getTrending = async () => {
    const {results} = await (await fetch(TRENDING_URL)).json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const {results} = await (await fetch(UPCOMING_URL)).json();
    setUpComing(results);
  };

  const getNowPlaying = async () => {
    const {results} = await (await fetch(API_URL)).json();
    //위에 {results}는 실제 wait (await fetch(API_URL)).json(); 안에는 dates, page,results가 있는데 {results}를 넣으면 results만 가져옴!! 중요!!!
    setNowPlaying(results);
    // setLoading(false);
  };
  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3}
        showsButtons={false}
        showsPagination={false}
        scrollsToTop
        containerStyle={{
          width: '100%',
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}>
        {nowPlaying.map(movie => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            originalTitle={movie.original_title}
            overview={movie.overview}
            vote_average={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendScroll
          data={trending}
          horizontal
          keyExtractor={item => item.id + ''}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
          renderItem={({item}) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_title}
              voteAverage={item.vote_average}
            />
          )}
        />
        {/* ScrollView */}
        {/* <TrendScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          // style={{paddingLeft: 30}}> // 이렇게 되면 왼쪽은 괜찮은데, 오른쪽은 이상해 지기 때문에 contentContainerStyle을 사용한다
          // TrendMovie 의 margin-rignt가 있어서 마지막 오른쪽 끝은 60px이 되기때문에 아래는 PLH만 주면 됨
          contentContainerStyle={{paddingLeft: 30}}>
          {trending.map(movie => (
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendScroll> */}
        {/* ScrollView */}
      </ListContainer>
      <CommingSoonTitle>Comming Soon</CommingSoonTitle>
      <FlatList
        data={upComing}
        keyExtractor={item => item.id + ''}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={({item}) => (
          <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
          />
        )}
      />
      {/* {upComing.map(movie => (
        <HMedia
          key={movie.id}
          posterPath={movie.poster_path}
          originalTitle={movie.original_title}
          overview={movie.overview}
          releaseDate={movie.release_date}
        />
      ))} */}
    </Container>
  );
};

export default Movie;
