import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { aspectRatio } from '../helpers/mixins'
import { fadeIn, fadeInUp } from '../../animation/animations'

import CloseSvg from '../../images/close.svg'

const VideoModal = ({ videoSrc, isVideoActive, onVideoActiveChange }) => (
  <AnimatePresence>
    {isVideoActive && (
      <Overlay className={isVideoActive ? 'active' : 'not-active'}>
        <Content initial="hidden" animate={isVideoActive ? 'visible' : 'hidden'} exit="exit" variants={fadeInUp}>
          <Close onClick={onVideoActiveChange} whileHover={{ rotate: 90, scale: 1.2 }}>
            <CloseIcon />
          </Close>
          <VideoWrapper>
            <video autoPlay={isVideoActive}>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </VideoWrapper>
        </Content>
        <ModalBackground onClick={onVideoActiveChange} initial="hidden" animate={isVideoActive ? 'visible' : 'hidden'} exit="exit" variants={fadeIn} />
      </Overlay>
    )}
  </AnimatePresence>
)

export default VideoModal

const Overlay = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
  }

  button {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }

  video {
    width: 100%;
    z-index: 5;
  }
`

const Content = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  will-change: transform, opacity;
  max-width: 90%;
  box-shadow: 0px 0px 5rem 0px rgba(0, 0, 0, 0.16);
  z-index: 10;
  background: #fff;
`

const ModalBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  will-change: opacity;
  z-index: 1;
`

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  ${aspectRatio(16, 9)};
`

const Close = styled(motion.button)`
  position: absolute;
  width: 2.1rem;
  height: 2.1rem;
  top: 2rem;
  right: 2rem;
  border: 0;
  background: transparent;
  padding: 0;
  will-change: transform;
  z-index: 10;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`

const CloseIcon = styled(CloseSvg)`
  width: 100%;
  height: 100%;
`
