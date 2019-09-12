import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import { fadeInUp } from '../../animation/animations'

import VideoPlaceholder from './video-placeholder'
import VideoModal from './video-modal'

export const fragment = graphql`
  fragment VideoFragment on WordPressAcf_video {
    id
    text
    still_image {
      localFile {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    full_video {
      localFile {
        publicURL
      }
    }
  }
`

const Video = ({ text, still_image: stillImage, full_video: fullVideo }) => {
  // Sets up the piece of state and it's default value
  const [videoActive, setVideoActive] = useState(false)

  // Stores some strings based on state
  const isVideoActive = !!videoActive

  // Inverts the state
  const handleVideoActive = () => setVideoActive(!videoActive)

  const [animation, setAnimation] = useState(undefined)

  const handleAnimation = () => {
    setAnimation(true)
  }

  return (
    <>
      <Waypoint onEnter={() => handleAnimation()} scrollableAncestor="window" bottomOffset="10%" />
      <motion.div animate={animation ? 'visible' : 'hidden'} variants={fadeInUp}>
        <VideoPlaceholder videoText={text} still={stillImage} onVideoActiveChange={handleVideoActive} />
      </motion.div>
      <VideoModal videoSrc={fullVideo.localFile.publicURL} isVideoActive={isVideoActive} onVideoActiveChange={handleVideoActive} />
    </>
  )
}

export default Video
