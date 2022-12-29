/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Dimensions, ActivityIndicator, FlatList, Alert} from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {MovieResponse, moviesApi} from '../api';

import HMedia from '../components/HMedia';

import Slide from '../components/Slide';
import {useQuery, QueryClient} from 'react-query';
import Loader from '../components/Loader';
import HList from '../components/HList';
import {useState} from 'react';

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

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Movie: React.FC<NativeStackScreenProps> = () => {
  const queryClient = new QueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    error: nowPlayingError,
    data: nowPlayingData,
    // isRefetching: isRefetchingnowPlaying,
  } = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);

  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcomingData,
    // isRefetching: isRefetchingUcoming,
  } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming);

  const {
    isLoading: trendingLoading,
    error: trendingError,
    data: trendingData,
    // isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);

  // console.log(trendingData);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };

  // const renderVMedia = ({item}) => (
  //   <VMedia
  //     posterPath={item.poster_path}
  //     originalTitle={item.original_title}
  //     voteAverage={item.vote_average}
  //   />
  // );

  // const renderHMedia = ({item}) => (
  //   <HMedia
  //     posterPath={item.poster_path}
  //     originalTitle={item.original_title}
  //     overview={item.overview}
  //     releaseDate={item.release_date}
  //   />
  // );

  const VSeparator = styled.View`
    width: 20px;
  `;

  const HSeparator = styled.View`
    height: 20px;
  `;

  // const movieKeyExtractor = item => item.id + '';
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // const refreshing =
  //   isRefetchingnowPlaying || isRefetchingUcoming || isRefetchingTrending;
  //  코드는 이쁜데 퍼포먼스가 너무 안나옴

  // console.log(Object.keys(nowPlayingData?.results[0]));
  // console.log(Object.values(nowPlayingData?.results[0]).map(v => typeof v));

  const loadMore = () => {
    Alert.alert('load more');
  };

  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.9}
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
            {nowPlayingData?.results.map(movie => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path || ''}
                poster_path={movie.poster_path || ''}
                originalTitle={movie.original_title}
                overview={movie.overview}
                vote_average={movie.vote_average}
                fullData={movie}
              />
            ))}
          </Swiper>

          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          {/* <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendScroll
                horizontal
                data={trendingData.results}
                keyExtractor={item => item.id + ''}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 20}}
                ItemSeparatorComponent={VSeparator}
                renderItem={({item}) => (
                  <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer> */}
          <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={item => item.id + ''}
      ItemSeparatorComponent={HSeparator}
      renderItem={({item}) => (
        <HMedia
          posterPath={item.poster_path || ''}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
          fullData={item}
        />
      )}
    />
  ) : null;
};

export default Movie;
