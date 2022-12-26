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
import {
  NOWPLAYING_URL,
  makeImgPath,
  TRENDING_URL,
  UPCOMING_URL,
  moviesApi,
} from '../api';
import {BlurView} from '@react-native-community/blur';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import Poster from './Poster';
import Slide from './Slide';
import {useQuery} from 'react-query';

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

  const {
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
    data: nowPlayingData,
  } = useQuery('nowPlaying', moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
  } = useQuery('upcoming', moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    error: trendingError,
    data: trendingData,
  } = useQuery('trending', moviesApi.trending);

  const onRefresh = async () => {};

  const renderVMedia = ({item}) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({item}) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const VSeparator = styled.View`
    width: 20px;
  `;

  const HSeparator = styled.View`
    height: 20px;
  `;

  const movieKeyExtractor = item => item.id + '';
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
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
            {nowPlayingData.results.map(movie => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                overview={movie.overview}
                vote_average={movie.vote_average}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendScroll
              data={trendingData.results}
              horizontal
              keyExtractor={movieKeyExtractor}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 20}}
              ItemSeparatorComponent={VSeparator}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movie;
