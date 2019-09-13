import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Img from 'gatsby-image'
import Parallax from 'kota-react-rellax'
import { staggeredFadeInUp } from '../../animation/animations'

import QuoteMarkOpenSvg from '../../images/quote-mark-open.svg'
import QuoteMarkCloseSvg from '../../images/quote-mark-close.svg'

export const fragment = graphql`
  fragment QuoteFragment on WordPressAcf_quote {
    id
    quote_text
    quote_source
    has_background_image
    background_colour
    background_image {
      localFile {
        childImageSharp {
          fluid(maxWidth: 2500) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

const Quote = ({ quote_text: quoteText, quote_source: quoteSource, background_image: backgroundImage, has_background_image: hasBackgroundImage, background_colour: backgroundColour }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Outer className={`${hasBackgroundImage ? 'image' : ''} ${backgroundColour}`} animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <Inner className="container">
        <QuoteText>
          <QuoteMarkOpen variants={staggeredFadeInUp.child}>
            <QuoteMarkOpenSvg />
          </QuoteMarkOpen>
          <motion.p variants={staggeredFadeInUp.child}>
            <span dangerouslySetInnerHTML={{ __html: quoteText }} />
            {quoteSource && <QuoteSource>{quoteSource}</QuoteSource>}
          </motion.p>
          <QuoteMarkClose className={hasBackgroundImage ? 'image' : 'no-image'} variants={staggeredFadeInUp.child}>
            <QuoteMarkCloseSvg />
          </QuoteMarkClose>
        </QuoteText>
      </Inner>
      {hasBackgroundImage && (
        <ParallaxImage center speed={2}>
          <Image fluid={backgroundImage.localFile.childImageSharp.fluid} className="aspect" style={{ position: 'absolute' }} />
        </ParallaxImage>
      )}
    </Outer>
  )
}

export default Quote

const ParallaxImage = styled(Parallax)`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
`

const QuoteMarkOpen = styled(motion.span)`
  position: absolute;
  top: -1rem;
  left: -2rem;
  width: 3.2rem;

  @media (max-width: 750px) {
    display: none;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`

const QuoteMarkClose = styled(motion.span)`
  position: absolute;
  bottom: -2rem;
  right: 3rem;
  width: 3.2rem;

  @media (max-width: 750px) {
    display: none;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  &.no-image {
    bottom: 0;
    right: -4.5rem;
  }
`

const QuoteSource = styled(motion.span)`
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.5;
  margin: 1rem 0 0;
  color: ${props => props.theme.colours.black};
`

const Outer = styled(motion.section)`
  position: relative;
  width: 100%;
  padding: 14rem 0;
  background: rgba(222, 235, 255, 0.2);
  text-align: center;
  overflow: hidden;

  @media (max-width: 750px) {
    padding: 6rem 0;
  }

  &.white {
    background-color: #fff;
  }

  &.light-blue {
    background-color: ${props => props.theme.colours.blueBackground};
  }

  .container {
    max-width: 80rem;
  }

  &.image {
    padding: 22.5rem 0;

    @media (max-width: 750px) {
      padding: 10rem 0;

      ${QuoteMarkOpen} {
        display: block;
        top: -7rem;
        left: -1rem;

        @media (max-width: 750px) {
          top: -7rem;
          left: 2.5rem;
        }
      }

      ${QuoteMarkClose} {
        display: block;
        bottom: -10rem;
        right: -1rem;

        @media (max-width: 750px) {
          bottom: -7rem;
          right: 2.5rem;
        }
      }
    }

    ${QuoteSource} {
      color: #fff;
    }

    p {
      color: #fff;
    }

    strong {
      color: #fff;
    }

    .container {
      max-width: 70rem;
    }
  }
`

const Inner = styled.div`
  display: inline-block;
  text-align: center;
  width: auto;
  z-index: 10;
`

const Image = styled(Img)`
  width: 100%;
  height: 150%;
  top: -25%;
  left: 0;

  &:before {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.65);
    z-index: 5;
  }
`

const QuoteText = styled.div`
  p {
    font-size: 3.2rem;
    position: relative;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 1rem;

    strong {
      color: ${props => props.theme.colours.primary};
      font-weight: 700;
    }
  }
`
