import React, { useState, useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { staggeredFadeInUp, fadeInLong } from '../../animation/animations'

import ChevronDownSvg from '../../images/chevron-down.svg'

export const fragment = graphql`
  fragment HeroFragment on wordpress__PAGEAcf {
    hero {
      main_title
      small_title
      add_button
      button_text
      button_link {
        path
      }
      background_video {
        localFile {
          url
        }
      }
      add_logos
      hero_logos {
        alt
        sizes {
          large {
            localFile {
              publicURL
            }
          }
        }
      }
    }
  }
`

const Hero = ({
  main_title: mainTitle,
  small_title: smallTitle,
  add_button: addButton,
  button_text: buttonText,
  button_link: buttonLink,
  add_logos: addLogos,
  hero_logos: heroLogos,
  background_video: backgroundVideo
}) => {
  const [playVideo, setPlayVideo] = useState(undefined)
  const handlePlayVideo = () => setPlayVideo(true)

  useEffect(() => {
    handlePlayVideo()
  })

  return (
    <>
      <HeroPad>
        <HeroWrap>
          <Container className="container">
            <Text initial="hidden" animate="visible" variants={staggeredFadeInUp.parent}>
              {smallTitle && <SmallTitle variants={staggeredFadeInUp.child}>{smallTitle}</SmallTitle>}
              <MainTitle variants={staggeredFadeInUp.child} dangerouslySetInnerHTML={{ __html: mainTitle }} />
              {addButton && (
                <motion.div variants={staggeredFadeInUp.child}>
                  <Link to={buttonLink.path} className="button">
                    {buttonText}
                  </Link>
                </motion.div>
              )}
              {addLogos && (
                <Logos>
                  {heroLogos.map((logo, i) => (
                    <motion.img src={logo.sizes.large.localFile.publicURL} alt={logo.alt} variants={staggeredFadeInUp.child} key={i} />
                  ))}
                </Logos>
              )}
            </Text>
          </Container>

          <DownChevron href="#more">
            <ChevronDownSvg />
          </DownChevron>

          <HeroGradient />

          <AnimatePresence>
            {playVideo && (
              <VideoBottom initial="hidden" animate={playVideo ? 'visible' : 'hidden'} exit="exit" variants={fadeInLong}>
                <video playsInline autoPlay={playVideo} muted loop src={backgroundVideo.localFile.url} />
              </VideoBottom>
            )}
          </AnimatePresence>
        </HeroWrap>
      </HeroPad>
    </>
  )
}

export default Hero

const HeroPad = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 750px) {
    height: 80vh;
  }

  &::before {
    content: '';
    display: block;
    padding-bottom: 56.25%;

    @media (max-width: 750px) {
      display: none;
    }
  }
`

const HeroWrap = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;

  @media (max-width: 750px) {
    height: 80vh;
  }

  &::before {
    content: '';
    display: block;
    padding-bottom: 56.25%;

    @media (max-width: 750px) {
      display: none;
    }
  }
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 10;

  .button {
    margin-top: 3rem;
  }
`

const Text = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;
  max-width: 70rem;
`

const SmallTitle = styled(motion.p)`
  position: relative;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
  margin-bottom: 2.5rem;
`

const MainTitle = styled(motion.h1)`
  font-size: 6rem;
  color: #fff;
  will-change: opacity, transform;

  @media (max-width: 1050px) {
    font-size: 5rem;
  }

  @media (max-width: 950px) {
    font-size: 4rem;
  }

  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

const Logos = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  img {
    margin: 0 35px 0 0;

    &:last-child {
      margin: 0;
    }
  }
`

const DownChevron = styled.a`
  position: absolute;
  bottom: 30px;
  width: 44px;
  height: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 40;

  svg {
    width: 100%;
    height: 100%;
  }
`

const HeroGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  opacity: 0.22;
  z-index: 5;
`

const VideoBottom = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
`
