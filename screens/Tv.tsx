import React, {useState} from 'react';
import {FlatList, RefreshControl, ScrollView, Text, View} from 'react-native';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import styled from 'styled-components/native';
import {tvApi} from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    // isRefetching: todayRefetching,
  } = useQuery(['tv', 'today'], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    // isRefetching: topRefetching,
  } = useQuery(['tv', 'top'], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    // isRefetching: trendingRefetching,
  } = useQuery(['tv', 'trending'], tvApi.trending);
  const loading = todayLoading || topLoading || trendingLoading;
  // const refreshing = todayRefetching || topRefetching || trendingRefetching;
  console.log(refreshing);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      contentContainerStyle={{paddingVertical: 30}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <HList title="Trending Tv" data={trendingData.results} />
      {/* <FlatList
          data={trendingData.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{paddingHorizontal: 30}}
          renderItem={({item}) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        /> */}
      {/* </HList> */}
      <HList title="Araing Today" data={todayData.results} />
      {/* <FlatList
          data={todayData.results}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{paddingHorizontal: 30}}
          horizontal
          renderItem={({item}) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        /> */}
      {/* </HList> */}
      <HList title="Top Rated Tv" data={topData.results} />
      {/* <FlatList
          data={topData.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={HListSeparator}
          contentContainerStyle={{paddingHorizontal: 30}}
          renderItem={({item}) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
        /> */}
      {/* </HList> */}
    </ScrollView>
  );
};

export default Tv;
