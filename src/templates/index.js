import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/global/seo'
import Hero from '../components/global/hero'
import PageBuilder from '../components/global/page-builder'
import Bugheard from '../components/global/bugheard'

export default ({ data }) => (
  <>
    <SEO {...data.wordpressPage.yoast_meta} title="data.wordpressPage.title" />
    <Hero {...data.wordpressPage.acf.hero} />
    <PageBuilder blocks={data.wordpressPage.acf.page_builder_page} removeTopMargin={data.wordpressPage.acf.remove_top_margin} />
    <Bugheard />
  </>
)

export const query = graphql`
  query($wordpressId: Int!) {
    wordpressPage(wordpress_id: { eq: $wordpressId }) {
      title
      ...SeoFragment
      acf {
        ...HeroFragment
        page_builder_page {
          __typename
          ...CentredTextFragment
          ...VideoFragment
          ...LatestProjectsFragment
          ...RowOfStatsFragment
          ...TextMediaRowsFragment
          ...CtaFragment
          ...QuoteFragment
          ...TeamFragment
          ...LogoGridFragment
          ...AwardsFragment
          ...TabsFragment
          ...ContactFragment
          ...ImageWithTextFragment
          ...SolutionsTabsFragment
        }
      }
    }
  }
`
