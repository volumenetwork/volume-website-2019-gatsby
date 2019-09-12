import React from 'react'
import Layout from './src/components/global/layout'

require('typeface-lato')

const transitionDelay = 1000

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

export const shouldUpdateScroll = ({ routerProps: { location }, getSavedScrollPosition }) => {
  if (location.action === 'PUSH') {
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      console.log('scroll')
    }, transitionDelay)
  } else {
    const savedPosition = getSavedScrollPosition(location)
    window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay)
  }
  return false
}
