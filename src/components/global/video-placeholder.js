import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { aspectRatio } from '../helpers/mixins'

import PlayIcon from '../../images/play-icon.svg'

const VideoPlaceholder = ({ videoText, still, onVideoActiveChange, ratio }) => (
  <Container className="container">
    <Outer>
      <Inner onClick={onVideoActiveChange}>
        <PlayIconStyled />
        <p>{videoText}</p>
      </Inner>
      <VideoStill fluid={still.localFile.childImageSharp.fluid} className={ratio} />
    </Outer>
  </Container>
)

export default VideoPlaceholder

const Outer = styled.div`
  position: relative;
  margin-bottom: 10rem;
  z-index: 5;

  @media (max-width: 750px) {
    margin-bottom: 5rem;
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 5;
  }
`

const Container = styled.section`
  @media (max-width: 750px) {
    padding: 0;
  }
`

const VideoStill = styled(Img)`
  ${aspectRatio(16, 9)}
  width: 100%;
  top: 0;
  left: 0;

  @media (max-width: 750px) {
    ${aspectRatio(375, 280)}
  }

  &.image {
    ${aspectRatio(572, 380)}
  }
`

const Inner = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;

  @media (max-width: 750px) {
    padding: 0;
  }

  p {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.4;
    color: #fff;
    margin: 0;

    @media (max-width: 750px) {
      font-size: 3rem;
    }
  }
`

const PlayIconStyled = styled(PlayIcon)`
  width: 5.8rem;
  height: 5.8rem;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;

  ${Inner}:hover & {
    transform: scale(1.1);
  }

  &.active {
    background: red;
  }
`
