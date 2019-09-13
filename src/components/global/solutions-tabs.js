import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint'
import { motion, useAnimation } from 'framer-motion'

import ChevronLeftSvg from '../../images/chevron-left.svg'
import ChevronRightSvg from '../../images/chevron-right.svg'

import BackgroundSvg from '../../images/background-v.svg'
import SolutionsTabsTitle from './solutions-tabs-title'
import SolutionsTabsContent from './solutions-tabs-content'
import SolutionsTabsImage from './solutions-tabs-image'

export const fragment = graphql`
  fragment SolutionsTabsFragment on WordPressAcf_solutions_tabs {
    id
    main_title
    solutions {
      box_text
      box_title
      button_link
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      link_title
    }
  }
`

const SolutionsTabs = ({ main_title: mainTitle, solutions }) => {
  const [tabActive, setTabActive] = useState(0)
  const controls = useAnimation()
  const arrowAnimation = useAnimation()

  const handleAnimation = () => {
    controls.start(i => ({
      opacity: 1,
      y: '0rem',
      transition: {
        type: 'spring',
        damping: 30,
        mass: 1,
        stiffness: 100,
        delay: i * 0.2
      }
    }))
  }

  const handleArrowAnimation = () => {
    arrowAnimation.start(delay => ({
      opacity: 1,
      x: '0%',
      transition: {
        type: 'spring',
        damping: 30,
        mass: 1,
        stiffness: 100,
        delay: delay * 0.2
      }
    }))
  }

  const numberOfTabs = solutions.length

  const handlePrevArrow = () => {
    if (tabActive - 1 >= 0) {
      setTabActive(tabActive - 1)
    } else {
      setTabActive(numberOfTabs - 1)
    }
  }
  const handleNextArrow = () => {
    if (tabActive + 1 < numberOfTabs) {
      setTabActive(tabActive + 1)
    } else {
      setTabActive(0)
    }
  }

  // setTimeout(() => handleNextArrow(), 1000)

  return (
    <>
      <Waypoint
        onEnter={() => {
          handleAnimation()
          handleArrowAnimation()
        }}
        scrollableAncestor="window"
        bottomOffset="30%"
      />
      <Outer className="Outer" custom={1} animate={controls}>
        <Inner>
          <SectionTitle>{mainTitle}</SectionTitle>
          <MainContainer>
            <Titles custom={2} animate={controls}>
              <ul>
                {solutions.map((solution, i) => (
                  <SolutionsTabsTitle title={solution.link_title} key={i} i={i} tabActive={tabActive} setTabActive={setTabActive} />
                ))}
              </ul>
            </Titles>
            <MainContent>
              <Arrows>
                <Arrow whileHover={{ scale: 1.2 }} onClick={() => handlePrevArrow()} custom={4} animate={arrowAnimation}>
                  <ChevronLeftSvg />
                </Arrow>
                <Arrow whileHover={{ scale: 1.2 }} onClick={() => handleNextArrow()} custom={4} animate={arrowAnimation}>
                  <ChevronRightSvg />
                </Arrow>
              </Arrows>
              <TabContentItem initial="hidden" custom={3} animate={controls}>
                {solutions.map((solution, i) => (
                  <SolutionsTabsContent content={solution} key={i} i={i} tabActive={tabActive} />
                ))}
              </TabContentItem>
            </MainContent>
            <ImageContainer initial="hidden" custom={4} animate={controls}>
              <SolutionsTabsImage tabActive={tabActive} tabs={solutions} />
            </ImageContainer>
          </MainContainer>
        </Inner>
        <BackgroundV>
          <BackgroundSvg />
        </BackgroundV>
        <Background />
      </Outer>
    </>
  )
}

export default SolutionsTabs

const BackgroundV = styled.div`
  position: absolute;
  bottom: 0;
  left: -20%;
  height: 100%;
  z-index: 3;

  svg {
    height: 100%;
  }
`

const Outer = styled(motion.section)`
  position: relative;
  padding: 10rem;
  transform: translateY(5rem);
  opacity: 0;

  @media (max-width: 1100px) {
    padding: 4rem 0 5rem;
  }
`

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: 100%;
  background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
  z-index: 1;

  @media (max-width: 1100px) {
    width: 100%;
  }
`

const SectionTitle = styled.h2`
  position: relative;
  font-family: ${props => props.theme.fonts.lato};
  font-size: 3.3rem;
  line-height: 1.2;
  font-weight: 700;
  color: #fff;
  left: 0;
  right: 0;
  margin: 0 auto;
  transform: translateX(-25%);
  max-width: 56rem;
  z-index: 5;

  @media (max-width: 1350px) {
    left: 10%;
    right: auto;
    margin: 0;
    transform: translateX(0);
    font-size: 3rem;
  }

  @media (max-width: 1100px) {
    left: 0;
    text-align: center;
    max-width: 100%;
  }

  @media (max-width: 500px) {
    max-width: 30rem;
    margin: 0 auto;
  }
`

const MainContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 5rem;
  z-index: 5;

  @media (max-width: 1100px) {
    margin-top: 14rem;
  }

  @media (max-width: 900px) {
    justify-content: center;
  }

  @media (max-width: 750px) {
    justify-content: flex-start;
    margin-top: 10rem;
    padding: 30px;
  }
`

const MainContent = styled(motion.div)`
  position: relative;
  width: 30%;
  max-width: 47rem;
  z-index: 10;

  @media (max-width: 1300px) {
    width: 35%;
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 40rem;
  }

  @media (max-width: 750px) {
    width: 90%;
  }
`

const TabContentItem = styled(motion.div)`
  position: relative;
  background: #fff;
  padding: 5rem 4rem 5rem;
  box-shadow: 0 0 9.5rem 0 rgba(0, 0, 0, 0.2);
  transform: translateY(5rem);
  opacity: 0;
  z-index: 10;

  @media (max-width: 750px) {
    padding: 4rem;
  }
`

const Titles = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 20%;
  margin: 3% 5% 0 10%;
  transform: translateY(5rem);
  opacity: 0;

  @media (max-width: 1300px) {
    margin: 0 5% 0 5%;
  }

  @media (max-width: 900px) {
    display: none !important;
  }

  ul {
    list-style: none;
  }
`

const Arrows = styled(motion.div)`
  position: absolute;
  top: 6rem;
  right: 4rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 15;

  @media (max-width: 750px) {
    top: 4rem;
    right: 3rem;
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
  }
`

const Arrow = styled(motion.div)`
  margin-left: 2.5rem;
  will-change: transform;
  opacity: 0;

  &:first-child {
    transform: translateX(100%);
  }

  &:last-child {
    transform: translateX(-100%);
  }

  &.has-animated {
    transform: translateX(0);
  }
`

const ImageContainer = styled(motion.div)`
  position: absolute;
  width: 30%;
  right: 10%;
  transform: translateY(5rem);
  opacity: 0;
  z-index: 5;

  @media (max-width: 900px) {
    width: 100%;
    max-width: 40rem;
  }

  @media (max-width: 750px) {
    right: 0;
  }

  &:after {
    content: '';
    display: block;
    padding-bottom: 120%;
  }
`
