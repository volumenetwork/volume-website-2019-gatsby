import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Img from 'gatsby-image'
import { staggeredFadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment ImageWithTextFragment on WordPressAcf_image_with_text {
    id
    title
    main_text
    image {
      localFile {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

const ImageWithText = ({ title, main_text: mainText, image }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Outer animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="25%" />
      <Inner className="container">
        <ImageContainer variants={staggeredFadeInUp.child}>
          <Img fluid={image.localFile.childImageSharp.fluid} />
        </ImageContainer>
        <Text variants={staggeredFadeInUp.child}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: mainText }} />
        </Text>
      </Inner>
    </Outer>
  )
}

export default ImageWithText

const Outer = styled(motion.section)`
  position: relative;
  width: 100%;
  padding: 14rem 0;

  @media (max-width: 750px) {
    padding: 5rem 0;
  }

  .container {
    max-width: 92rem;
  }
`

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 750px) {
    flex-direction: column-reverse;
  }
`

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 46.5%;

  @media (max-width: 750px) {
    width: 100%;
    max-width: 50rem;
  }

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
      top: 1rem;
      left: -1rem;
    }
  }
`

const Text = styled(motion.div)`
  width: 46.5%;

  @media (max-width: 750px) {
    width: 100%;
    max-width: 50rem;
    margin-bottom: 5rem;
  }

  h2 {
    font-size: 2.8rem;
    line-height: 1.5;
    color: ${props => props.theme.colours.primary};
    margin-bottom: 1em;
  }

  p {
    font-size: 1.8rem;
    line-height: 1.9;
    font-weight: 300;

    br {
      line-height: 3;
    }

    &:last-child {
      margin: 0;
    }

    a {
      color: ${props => props.theme.colours.orangeDark};

      &:hover {
        text-decoration: none;
      }
    }
  }
`
