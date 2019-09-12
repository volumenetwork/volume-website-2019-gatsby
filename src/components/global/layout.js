import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import theme from './theme'

import { resetStyles } from '../../styles/reset'

import Transition from '../../animation/transition'
import Header from './header'
import Footer from './footer'

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]')
}

const variants = {
  initial: {
    opacity: 1
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 1,
      when: 'beforeChildren'
    }
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

const GlobalStyle = createGlobalStyle`
  ${resetStyles()}
  html {
    font-size: 9px;
  }
  @media (min-width: 1450px) {
    html {
      font-size: 10px;
    }
  }
  @media (min-width: 1700px) {
    html {
      font-size: 12px;
    }
  }
  body {
    font-family: ${props => props.theme.fonts.lato};
    max-width: 100vw;
    overflow: hidden;
  }
  p {
    margin-bottom: 1.5rem;
    color: ${props => props.theme.colours.grey};
  }
  .button {
    display: inline-block;
    font-size: 1.2rem;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: 0.1rem;
    text-decoration: none;
    text-transform: uppercase;
    padding: 2rem 3.5rem 2rem;
    color: #fff;
    transition: background-color 0.3s ease;
    background-color: ${props => props.theme.colours.secondary};
    &:hover {
      background-color: ${props => props.theme.colours.primary};
    }
  }
  .container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 119rem;
    padding: 0 30px;
  }
`

const Layout = ({ children, location }) => {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (location.action === 'PUSH') {
      setMounted(true)
      setTimeout(() => setMounted(false), 1000)
    }
  }, [location])

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Header />
        <Transition mounted={mounted} />
        <AnimatePresence exitBeforeEnter>
          <motion.main key={location.pathname} variants={variants} initial="initial" animate="enter" exit="exit">
            {children}
          </motion.main>
        </AnimatePresence>
        <div id="modal" ref={ref} />
        <Footer />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
