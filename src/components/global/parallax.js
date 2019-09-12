import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion, useTransform } from 'framer-motion'
import styled from 'styled-components'

const Parallax = ({ children }) => {
  const [elementTop, setElementTop] = useState(0)
  const ref = useRef(null)

  const y = useTransform(elementTop, value => value * 2, {
    clamp: false
  })

  useLayoutEffect(() => {
    const element = ref.current
    setElementTop(element.getBoundingClientRect().top)
  }, [ref])

  return (
    <ParallaxContainer ref={ref}>
      <motion.div className="image-container" style={{ y }}>
        {children}
      </motion.div>
    </ParallaxContainer>
  )
}

export default Parallax

const ParallaxContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`

// const ParallaxItem = styled(motion.div)`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   z-index: 1;
// `
