import React, { useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import Parallax from 'kota-react-rellax'
import { aspectRatio } from '../helpers/mixins'
import { fadeInUp, fadeInUpDelayed } from '../../animation/animations'

import CaseStudyButton from './case-study-button'
import BackgroundSymbolSvg from '../../images/v-symbol.svg'

const MediaRow = ({ content }) => {
  const [animation, setAnimation] = useState(false)

  const handleActive = () => setAnimation(true)
  return (
    <>
      <Row id={content.section_id}>
        <Waypoint onEnter={() => handleActive()} scrollableAncestor="window" bottomOffset="10%" />
        <Inner className="container">
          <Text animate={animation ? 'visible' : 'hidden'} variants={fadeInUpDelayed}>
            <Title dangerouslySetInnerHTML={{ __html: content.text.box_title }} />
            <TextWrap dangerouslySetInnerHTML={{ __html: content.text.box_text }} />
            {(() => {
              switch (content.media.type_of_media) {
                case 'image':
                  return <Dash />
                case 'case-study':
                  return <CaseStudyButton caseStudy={content.media.case_study_link} />
                default:
                  return null
              }
            })()}
          </Text>
          <Media animate={animation ? 'visible' : 'hidden'} variants={fadeInUp}>
            {(() => {
              switch (content.media.type_of_media) {
                case 'image':
                  return <Image fluid={content.media.image.localFile.childImageSharp.fluid} className="aspect" />
                case 'case-study':
                  return <Image fluid={content.media.image.localFile.childImageSharp.fluid} className="aspect" />
                default:
                  return null
              }
            })()}
          </Media>
        </Inner>
        {content.add_background_v_symbol && (
          <BackgroundSymbol>
            <ParallaxBackgroundSymbol center speed={4}>
              <BackgroundSymbolSvg />
            </ParallaxBackgroundSymbol>
          </BackgroundSymbol>
        )}
      </Row>
    </>
  )
}
export default MediaRow

const ParallaxBackgroundSymbol = styled(Parallax)``

const Inner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 122rem;
  z-index: 5;

  @media (max-width: 750px) {
    flex-direction: column-reverse;
    padding: 0;
  }
`

const BackgroundSymbol = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50vw;
  transform: translate(20%, -22%);
  z-index: 1;

  @media (max-width: 750px) {
    display: none;
  }
`

const Row = styled(motion.div)`
  position: relative;
  margin-bottom: 23rem;

  @media (max-width: 750px) {
    margin-bottom: 0;
  }

  &:nth-child(odd) {
    ${Inner} {
      flex-direction: row-reverse;

      @media (max-width: 750px) {
        flex-direction: column-reverse;
      }
    }
  }

  &:nth-child(even) {
    ${BackgroundSymbol} {
      right: auto;
      left: 0;
      transform: translate(-20%, -22%);
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const Text = styled(motion.div)`
  width: 49.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10rem;

  @media (max-width: 1000px) {
    padding: 0 5rem;
  }

  @media (max-width: 800px) {
    padding: 0 2.5rem;
  }

  @media (max-width: 750px) {
    width: 100%;
    max-width: 34rem;
    padding: 0 30px;
    margin: 5rem auto;
  }

  @media (max-width: 750px) {
    width: 100%;
    max-width: 50rem;
  }

  p {
    font-size: 1.6rem;
    line-height: 1.75;
  }

  ul {
    margin-left: 1.9rem;
  }

  li {
    font-size: 1.6rem;
    line-height: 1.75;
    margin-bottom: 0.5rem;
  }

  > div > *:last-child {
    margin-bottom: 0;
  }

  a {
    color: ${props => props.theme.colours.orangeDark};

    &:hover {
      text-decoration: none;
    }
  }
`

const Title = styled.h3`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0.01rem;
  color: ${props => props.theme.colours.primary};
  letter-spacing: 0.01rem;
  overflow-wrap: initial;
`

const Media = styled(motion.figure)`
  width: 49.5%;
  margin: 0;

  @media (max-width: 750px) {
    width: 100%;
  }
`

const Image = styled(Img)`
  ${aspectRatio(572, 380)}
  width: 100%;
  overflow: visible !important;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 2rem;
    left: -2rem;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.colours.secondary};
    background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
    z-index: -1;

    @media (max-width: 750px) {
      display: none;
    }
  }
`

const TextWrap = styled.div`
  position: relative;
  max-width: 34rem;
  padding-bottom: 3rem;

  strong {
    color: ${props => props.theme.colours.black};
  }

  ul {
    margin-left: 1.8rem;
  }

  li {
    margin: 0;
    color: ${props => props.theme.colours.grey};
  }
`

const Dash = styled.div`
  width: 2rem;
  height: 0.2rem;
  background: ${props => props.theme.colours.secondary};
`
