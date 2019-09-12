import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import CountUp from 'react-countup'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { staggeredFadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment RowOfStatsFragment on WordPressAcf_row_of_stats {
    id
    block_title
    stats {
      number
      stat_title
      icon {
        alt
        url {
          localFile {
            publicURL
          }
        }
      }
    }
  }
`

const RowOfStats = ({ stats, block_title: blockTitle }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Outer>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <Container className="container" animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
        <BlockTitle variants={staggeredFadeInUp.child}>{blockTitle}</BlockTitle>
        {stats.map((stat, i) => (
          <Stat key={i} variants={staggeredFadeInUp.child}>
            <Icon>
              <img src={stat.icon.url.localFile.publicURL} alt={stat.icon.alt} />
            </Icon>
            <Number>
              <CountUp end={parseInt(stat.number)} duration={1.5} separator=",">
                {({ countUpRef, start }) => (
                  <div>
                    <Waypoint onEnter={start} scrollableAncestor="window" bottomOffset="10%" />
                    <span ref={countUpRef} />
                  </div>
                )}
              </CountUp>
            </Number>
            <Title>{stat.stat_title}</Title>
          </Stat>
        ))}
      </Container>
    </Outer>
  )
}

export default RowOfStats

const Outer = styled.section`
  width: 100%;
  padding: 12rem 0;
  background: ${props => props.theme.colours.blueBackground};

  @media (max-width: 750px) {
    padding: 7rem 5rem 0;
  }
`

const BlockTitle = styled(motion.p)`
  position: relative;
  width: 100%;
  font-size: 4rem;
  font-weight: 300;
  line-height: 1.4;
  text-align: center;
  margin-bottom: 5rem;

  @media (max-width: 750px) {
    display: none;
  }
`

const Container = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Stat = styled(motion.figure)`
  width: 32%;
  text-align: center;

  @media (max-width: 750px) {
    width: 100%;
    margin-bottom: 5rem;
  }
`

const Number = styled.div`
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.2;
  color: ${props => props.theme.colours.secondary};
`

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1.2;
  text-transform: uppercase;
  color: ${props => props.theme.colours.primary};
  margin: 1.5rem 0;
  letter-spacing: 0.1rem;
`

const Icon = styled.figure`
  position: relative;
  width: 7.5rem;
  height: 7.5rem;
  margin: 0 auto;
  margin-bottom: 2.5rem;

  &::after {
    content: '';
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    top: -0.6rem;
    left: -2rem;
    display: block;
    opacity: 0.17;
    background: ${props => props.theme.colours.primary};
    border-radius: 50%;
    z-index: 1;
  }

  img {
    position: relative;
    height: 100%;
    width: auto;
    z-index: 10;
  }
`
