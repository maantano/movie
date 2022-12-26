import React from 'react';
import styled from 'styled-components/native';
import {makeImgPath} from '../api';

interface PosterProps {
  path: string;
}
const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
`;
const Poster: React.FC<PosterProps> = ({path}) => {
  const posterPath = makeImgPath(path);
  return <Image source={{uri: posterPath}} />;
};
export default Poster;
