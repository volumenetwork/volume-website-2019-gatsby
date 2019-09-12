import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { staggeredFadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment AwardsFragment on WordPressAcf_awards {
    id
    awards {
      year
      placing
      description
      logo {
        localFile {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const Awards = ({ awards }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Outer>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <Inner className="container" animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
        {awards.map((award, i) => (
          <Award key={i} variants={staggeredFadeInUp.child}>
            <Logo>
              <Image fluid={award.logo.localFile.childImageSharp.fluid} />
            </Logo>
            {award.year && <Year>{award.year}</Year>}
            {award.placing && <Placing>{award.placing}</Placing>}
            {award.description && <Description>{award.description}</Description>}
          </Award>
        ))}
      </Inner>
    </Outer>
  )
}

export default Awards

const Outer = styled.section`
  padding: 10rem 0;

  @media (max-width: 750px) {
    padding: 5rem 0;
  }
`

const Inner = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 95rem;

  @media (max-width: 850px) {
    justify-content: center;
  }

  @media (max-width: 550px) {
    justify-content: space-between;
  }
`

const Award = styled(motion.div)`
  text-align: center;
  width: 22.5%;

  @media (max-width: 850px) {
    width: 43%;
  }
`

const Image = styled(Img)`
  width: 100%;
`

const Logo = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 14rem;
  margin: 0 auto 2rem;
`

const Year = styled.p`
  font-weight: 700;
  font-size: 3.7rem;
  line-height: 1.5;
  color: #404040;
  margin-bottom: 0;

  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

const Placing = styled.p`
  font-size: 1.6rem;
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: ${props => props.theme.colours.primary};

  @media (max-width: 750px) {
    font-size: 1.3rem;
  }
`
const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.75;

  @media (max-width: 750px) {
    font-size: 1.6rem;
  }
`
