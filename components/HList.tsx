import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {Movie, TV} from '../api';
import VMedia from './VMedia';

interface HListProps {
  title: string;
  data: Movie | TV;
}

export const HListSeparator = styled.View`
  width: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

const HList: React.FC<HListProps> = ({title, data}) => {
  //   console.log(children);
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{paddingHorizontal: 30}}
        keyExtractor={(item: Movie | TV) => item.id + ''}
        renderItem={({item}: {item: Movie | TV}) => (
          <VMedia
            posterPath={item.poster_path || ''}
            originalTitle={item.original_title ?? item.original_name}
            // originalTitle={item.original_title ? item.original_title : item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default HList;
