import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { staggeredFadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment LogoGridFragment on WordPressAcf_logo_grid {
    id
    title
    intro
    logos {
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
`

const LogoGrid = ({ title, intro, logos }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Outer>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="30%" />
      <motion.div className="container" animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
        {title && <Title variants={staggeredFadeInUp.child}>{title}</Title>}
        <Intro variants={staggeredFadeInUp.child} className={title ? 'small' : 'normal'}>
          {intro}
        </Intro>
        <Logos>
          {logos.map((logo, i) => (
            <Logo key={i} variants={staggeredFadeInUp.child}>
              <img src={logo.sizes.large.localFile.publicURL} alt={logo.alt} key={i} />
            </Logo>
          ))}
        </Logos>
      </motion.div>
    </Outer>
  )
}

export default LogoGrid

const Outer = styled.section`
  padding: 10rem 0 8rem;
  background: ${props => props.theme.colours.blueBackground};

  @media (max-width: 750px) {
    padding: 5rem 0 0;
  }
`

const Title = styled(motion.p)`
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.25;
  color: ${props => props.theme.colours.primary};
  max-width: 59rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 3rem;
`

const Intro = styled(motion.p)`
  font-size: 2.8rem;
  font-weight: 300;
  line-height: 1.4;
  max-width: 59rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 750px) {
    font-size: 2.2rem;
  }

  &.small {
    font-weight: 400;
    font-size: 1.6rem;
  }
`

const Logos = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 90rem;
  margin: 0 auto;
`

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.5rem;
  height: 12.5rem;
  margin: 0 2rem;

  img {
    max-width: 100%;
    height: auto;
    margin: 0;
  }
`
