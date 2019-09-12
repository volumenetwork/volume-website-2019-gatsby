import React from 'react'
import Layout from './src/components/global/layout'

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>
