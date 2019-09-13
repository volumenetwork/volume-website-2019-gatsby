import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment CentredTextFragment on WordPressAcf_centred_text {
    id
    text
  }
`

const CentredText = ({ text }) => {
  const [animation, setAnimation] = useState(false)
  const handleActive = () => setAnimation(true)

  return (
    <Outer className="Outer">
      <Waypoint onEnter={() => handleActive()} scrollableAncestor="window" bottomOffset="10%" />
      <Inner>
        <motion.p animate={animation ? 'visible' : 'hidden'} variants={fadeInUp}>
          {text}
        </motion.p>
      </Inner>
    </Outer>
  )
}

export default CentredText

const Outer = styled.section`
  background: ${props => props.theme.colours.blueBackground};
  padding: 12.5rem 3rem;
`

const Inner = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;

  p {
    position: relative;
    font-size: 2.8rem;
    line-height: 1.4;
    font-weight: 300;
    text-align: center;
    color: ${props => props.theme.colours.black};

    &::after {
      content: '';
      position: absolute;
      bottom: -3rem;
      left: 0;
      right: 0;
      width: 2rem;
      height: 0.2rem;
      margin: 0 auto;
      background: ${props => props.theme.colours.secondary};
    }
  }
`
