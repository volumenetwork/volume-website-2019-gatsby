import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const fadeInUp = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      mass: 1,
      stiffness: 200
    }
  },
  hidden: {
    opacity: 0,
    y: 50
  }
}

const FadeInUp = ({ children }) => {
  const [active, setActive] = useState(false)

  const handleActive = () => setActive(!active)

  return (
    <>
      <Waypoint onEnter={() => handleActive()} scrollableAncestor="window">
        {children}
      </Waypoint>
    </>
  )
}

export default FadeInUp
