import React from 'react'
import Layout from './src/components/global/layout'

/** ************************************************************
-> Import the Google Fonts typeface Lato (NPM package)
************************************************************* */
require('typeface-lato')

/** ************************************************************
-> Delay the transition between pages and update the scroll
************************************************************* */
const transitionDelay = 500

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => {
      window.scrollTo(0, 0)
    }, transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay)
  }
  return false
}

/** ************************************************************
-> Scroll to anchor links after page transitions
************************************************************* */
const scrollToElement = require('scroll-to-element')

const anchorScrollDelay = transitionDelay + 1000

const checkHash = location => {
  const { hash } = location
  if (hash) {
    setTimeout(() => {
      scrollToElement(hash, {
        offset: -50,
        ease: 'out-expo',
        duration: 1200
      })
    }, anchorScrollDelay)
  }
}

export const onRouteUpdate = ({ location }) => {
  checkHash(location)
}
