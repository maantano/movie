import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {Movie, TV} from '../api';
import Poster from './Poster';
import Votes from './Votes';

const MovieCon = styled.View`
  /* margin-right: 20px; */
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        // originalTitle,
        ...fullData,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <MovieCon>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 13)}
          {originalTitle.length > 13 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </MovieCon>
    </TouchableOpacity>
  );
};

export default VMedia;
