import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInLong } from '../../animation/animations'

const SolutionsTabsImage = ({ tabActive, tabs }) => {
  const numberOfTabs = tabs.length
  const [imageCurent, setImageCurrent] = useState(tabs[0].image.localFile.childImageSharp.fluid)

  useEffect(() => {
    switch (tabActive) {
      case 0:
        setImageCurrent(tabs[0].image.localFile.childImageSharp.fluid)
        break
      case numberOfTabs - 1:
        setImageCurrent(tabs[numberOfTabs - 1].image.localFile.childImageSharp.fluid)
        break
      default:
        setImageCurrent(tabs[tabActive].image.localFile.childImageSharp.fluid)
    }
  }, [tabActive, tabs, numberOfTabs])

  return (
    <AnimatePresence>
      <SingleImageContainer initial="hidden" exit="exit" animate="visible" variants={fadeInLong} key={tabActive}>
        <Image fluid={imageCurent} className="aspect active-image" style={{ position: 'absolute' }} />
      </SingleImageContainer>
    </AnimatePresence>
  )
}

export default SolutionsTabsImage

const SingleImageContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transform: translateY(-30%);

  @media (max-width: 1200px) {
    transform: translateY(-20%);
  }

  &:after {
    content: '';
    display: block;
    padding-bottom: 120%;
  }
`

const Image = styled(Img)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &.active-image {
    z-index: 3;
  }

  &.prev-image {
    z-index: 1;
    opacity: 0;
  }

  &.next-image {
    z-index: 1;
    opacity: 0;
  }
`
