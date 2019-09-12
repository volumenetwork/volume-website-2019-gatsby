import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import { fadeInSlow } from '../../animation/animations'

import ChevronLeftSvg from '../../images/chevron-left.svg'
import ChevronRightSvg from '../../images/chevron-right.svg'

const SolutionsTabContent = ({ content, i, tabActive, setTabActive, numberOfTabs }) => {
  const isOpen = i === tabActive

  const handlePrevArrow = () => {
    if (i - 1 >= 0) {
      setTabActive(i - 1)
    } else {
      setTabActive(numberOfTabs - 1)
    }
  }
  const handleNextArrow = () => {
    if (i + 1 < numberOfTabs) {
      setTabActive(i + 1)
    } else {
      setTabActive(0)
    }
  }

  return (
    <>
      {isOpen && (
        <>
          <TabContentItem>
            <Content initial="hidden" animate="visible" variants={fadeInSlow}>
              <Title>{content.box_title}</Title>
              <Text>{content.box_text}</Text>
              <Button className="button" to={content.button_link} exit={{ length: 1 }} entry={{ length: 1.5 }}>
                Discover more
              </Button>
            </Content>
            <Arrows>
              <Arrow whileHover={{ scale: 1.2 }} onClick={() => handlePrevArrow()}>
                <ChevronLeftSvg />
              </Arrow>
              <Arrow whileHover={{ scale: 1.2 }} onClick={() => handleNextArrow()}>
                <ChevronRightSvg />
              </Arrow>
            </Arrows>
          </TabContentItem>
          <ImageContainer initial="hidden" animate="visible" variants={fadeInSlow}>
            <Image fluid={content.image.localFile.childImageSharp.fluid} className="aspect" style={{ position: 'absolute' }} />
          </ImageContainer>
        </>
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

const TabContentItem = styled(motion.div)`
  position: relative;
  background: #fff;
  padding: 5rem 4rem 5rem;
  box-shadow: 0 0 9.5rem 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
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

const ImageContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: -85%;
  top: -20%;
  z-index: 5;

  @media (max-width: 900px) {
    right: -35%;
    top: -20%;
  }

  @media (max-width: 750px) {
    right: -25%;
  }
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const Arrows = styled.div`
  position: absolute;
  top: 6rem;
  right: 4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
`

const Arrow = styled(motion.div)`
  margin-left: 2.5rem;
  will-change: transform;
`
