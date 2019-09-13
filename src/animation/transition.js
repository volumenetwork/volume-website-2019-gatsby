import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import LogoSvg from '../images/transition-v.svg'

const Transition = ({ mounted }) => {
  const containerVariants = {
    visible: {
      y: ['-100%', '-0.01%', '0.01%', '100%'],
      transition: {
        type: 'tween',
        times: [0, 0.3, 0.7, 1],
        duration: 1,
        ease: [0.62, 0, 0.34, 0.99]
      }
    },
    hidden: {
      y: '-100%',
      transition: {
        type: 'tween',
        duration: 0
      }
    }
  }

  const logoVariants = {
    visible: {
      opacity: [0, 0, 0.2, 0.2, 0, 0],
      transition: {
        type: 'tween',
        times: [0, 0.05, 0.15, 0.55, 0.55, 1],
        duration: 1.5,
        ease: 'linear'
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0
      }
    }
  }

  return (
    <>
      <LogoContainer variants={logoVariants} initial="hidden" animate={mounted ? 'visible' : 'hidden'}>
        <Logo />
      </LogoContainer>
      <PageOverlay variants={containerVariants} initial="hidden" animate={mounted ? 'visible' : 'hidden'}></PageOverlay>
    </>
  )
}

export default Transition

const LogoContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 9999;
`

const Logo = styled(LogoSvg)`
  position: fixed;
  top: 50%;
  width: 40vw;
  height: 40vw;
  transform: translateY(-50%);
  opacity: 0.3;
`

const PageOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colours.primary};
  background: linear-gradient(0deg, ${props => props.theme.colours.gradientEnd} 0%, ${props => props.theme.colours.gradientStart} 100%);
  transform: translateX(100%);
  will-change: transform;
  z-index: 9998;
`
