import React from 'react';

import styled from 'styled-components/native';
import {BlurView} from '@react-native-community/blur';
import {makeImgPath, Movie} from '../api';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import Poster from './Poster';
import {useNavigation} from '@react-navigation/native';

const View = styled.View`
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Overview = styled.Text`
  margin-top: 15px;
  color: rgba(255, 255, 255, 0.6);
`;
const Votes = styled(Overview)`
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.6);
`;
const BgImg = styled.Image`
  /* flex: 1; */
  width: 100%;
  height: 100%;
  /* position: absolute; */
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  originalTitle: string;
  overview: string;
  vote_average: number;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  originalTitle,
  overview,
  vote_average,
  fullData,
}) => {
  const imgPath = makeImgPath(backdrop_path);

  const isDark = useColorScheme() === 'dark';
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
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{uri: imgPath}}
          // source={{uri: makeImgPath(movie.backdrop_path)}}
        />

        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={isDark ? 'dark' : 'light'}
          blurAmount={1}
          reducedTransparencyFallbackColor="white"
        />
        <Wrapper>
          <Poster path={poster_path} />

          <Column>
            <Title>{originalTitle}</Title>
            <Overview>{overview.slice(0, 90)}...</Overview>
            {vote_average > 0 ? <Votes>⭐️ {vote_average}/10</Votes> : null}
          </Column>
        </Wrapper>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
