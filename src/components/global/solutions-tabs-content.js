import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInLeft } from '../../animation/animations'

const SolutionsTabContent = ({ content, i, tabActive }) => {
  const isOpen = i === tabActive

  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <Content initial="hidden" animate="visible" exit="exit" variants={fadeInLeft}>
            <Title>{content.box_title}</Title>
            <Text>{content.box_text}</Text>
            <Button className="button" to={content.button_link} exit={{ length: 1 }} entry={{ length: 1.5 }}>
              Discover more
            </Button>
          </Content>
        </AnimatePresence>
      )}
    </>
  )
}

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export default SolutionsTabContent

const ImageContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: -85%;
  top: -20%;
  transform: translateY(5rem);
  opacity: 0;
  z-index: 5;

  @media (max-width: 900px) {
    right: -35%;
    top: -20%;
  }

  @media (max-width: 750px) {
    right: -25%;
  }
`

const Title = styled.p`
  font-size: 4rem;
  line-height: 1.2;
  font-weight: 300;
  color: ${props => props.theme.colours.primary};
  margin: 5rem 0 2rem;

  @media (max-width: 1100px) {
    font-size: 3.5rem;
  }

  @media (max-width: 750px) {
    font-size: 3rem;
  }
`

const Text = styled.p`
  font-size: 1.6rem;
  line-height: 1.75;
  font-weight: 700;
  color: ${props => props.theme.colours.black};
  margin-bottom: 3rem;
  max-width: 34rem;
`

const Button = styled(Link)`
  background: ${props => props.theme.colours.secondary};
  border: 0;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`
