import React, { useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animation/animations'

import VideoPlaceholder from './video-placeholder'
import VideoModal from './video-modal'
import CaseStudyButton from './case-study-button'

const TabContent = ({ content, i, tabActive }) => {
  const isOpen = i === tabActive
  const [videoActive, setVideoActive] = useState(false)
  const isVideoActive = !!videoActive
  const handleVideoActive = () => setVideoActive(!videoActive)

  return (
    <>
      {isOpen && (
        <TabContentItem initial="hidden" animate="visible" variants={fadeInUp}>
          <TabTextContainer>
            <TabTitle>{content.title}</TabTitle>
            <TabText dangerouslySetInnerHTML={{ __html: content.content }} />
            {content.case_study_link && <CaseStudyButton caseStudy={content.case_study_link} />}
          </TabTextContainer>
          {(() => {
            switch (content.video_or_image) {
              case 'image':
                return <Img fluid={content.image.localFile.childImageSharp.fluid} />
              case 'video':
                return (
                  <>
                    <VideoPlaceholder videoText={content.video_text} still={content.video_image} onVideoActiveChange={handleVideoActive} ratio="image" />
                    <VideoModal videoSrc={content.video.localFile.url} isVideoActive={isVideoActive} onVideoActiveChange={handleVideoActive} />
                  </>
                )
              default:
                return null
            }
          })()}
        </TabContentItem>
      )}
    </>
  )
}

export default TabContent

const TabContentItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8rem;

  @media (max-width: 750px) {
    margin-top: 3rem;
  }

  @media (max-width: 750px) {
    flex-direction: column-reverse;
  }

  > * {
    &:first-child {
      width: 50%;

      @media (max-width: 750px) {
        width: 100%;
      }
    }

    &:nth-child(2) {
      width: 45%;

      @media (max-width: 750px) {
        width: 100%;
      }

      p {
        font-size: 2.7rem;
        font-weight: 300;
      }
    }
  }

  .container {
    padding: 0;
    margin: 0;
    z-index: 5;

    &::after {
      content: '';
      position: absolute;
      top: 2rem;
      left: -2rem;
      width: 100%;
      height: 100%;
      background-color: ${props => props.theme.colours.secondary};
      background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
      z-index: 1;
    }

    > div {
      margin-bottom: 0;
    }
  }
`

const TabTextContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;

  @media (max-width: 750px) {
    margin: 4rem 0 2rem;
  }

  strong {
    color: #353535;
  }

  ul {
    margin-left: 1.8rem;
  }

  li {
    margin: 0;
  }
`

const TabTitle = styled.h3`
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1.75;
  letter-spacing: 0.02rem;
  color: ${props => props.theme.colours.primary};
`

const TabText = styled.p`
  font-size: 1.6rem;
  line-height: 1.75;
  max-width: 48.5rem;
`
