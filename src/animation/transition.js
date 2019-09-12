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
        times: [0, 0.2, 0.8, 1],
        duration: 1,
        ease: ['circOut', 'circOut', 'circIn', 'circIn']
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
        times: [0, 0.05, 0.15, 0.85, 0.95, 1],
        duration: 1,
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
  width: 60rem;
  height: 60rem;
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
