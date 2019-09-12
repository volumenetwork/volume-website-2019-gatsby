import React, { useState } from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { staggeredFadeInUp } from '../../animation/animations'

export const fragment = graphql`
  fragment CtaFragment on WordPressAcf_call_to_action {
    id
    heading
    button_text
    background_colour
    button_link {
      path
    }
  }
`

const Cta = ({ heading, button_link: buttonLink, button_text: buttonText, background_colour: backgroundColour }) => {
  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <Outer className={backgroundColour} animate={animation ? 'visible' : 'hidden'} variants={staggeredFadeInUp.parent}>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <Container className="container">
        <Title variants={staggeredFadeInUp.child}>{heading}</Title>
        <motion.div variants={staggeredFadeInUp.child}>
          <Link to={buttonLink.path} className="button">
            {buttonText}
          </Link>
        </motion.div>
      </Container>
    </Outer>
  )
}

export default Cta

const Outer = styled(motion.section)`
  width: 100%;
  padding: 12.5rem 0;

  @media (max-width: 750px) {
    padding: 5rem 0;
  }

  &.white {
    background-color: #fff;
  }

  &.light-blue {
    background-color: ${props => props.theme.colours.blueBackground};
  }
`

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled(motion.p)`
  text-align: center;
  font-size: 2.4rem;
  line-height: 1.4;
  font-weight: 300;
  max-width: 76rem;
  margin-bottom: 3rem;
`
