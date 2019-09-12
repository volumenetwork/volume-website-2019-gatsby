import React from 'react'
import styled from 'styled-components'

import CentredText from './centred-text'
import Video from './video'
import LatestProjects from './latest-projects'
import RowOfStats from './row-of-stats'
import TextMediaRows from './text-media-rows'
import Cta from './cta'
import Quote from './quote'
import Team from './team'
import LogoGrid from './logo-grid'
import Awards from './awards'
import Tabs from './tabs'
import Contact from './contact'
import ImageWithText from './image-with-text'
import SolutionsTabs from './solutions-tabs'

const PageBuilderContainer = styled.section`
  position: relative;
  width: 100%;
  background: #fff;
`

const Wrapper = styled.div`
  position: relative;
  z-index: 2;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1;
`

const PageBuilder = ({ blocks }) => (
  <PageBuilderContainer id="more">
    <Wrapper>
      {blocks.map(block => {
        switch (block.__typename) {
          case 'WordPressAcf_centred_text':
            return <CentredText key={block.id} {...block} />
          case 'WordPressAcf_video':
            return <Video key={block.id} {...block} />
          case 'WordPressAcf_latest_projects':
            return <LatestProjects key={block.id} {...block} />
          case 'WordPressAcf_row_of_stats':
            return <RowOfStats key={block.id} {...block} />
          case 'WordPressAcf_text_media_rows':
            return <TextMediaRows key={block.id} {...block} />
          case 'WordPressAcf_call_to_action':
            return <Cta key={block.id} {...block} />
          case 'WordPressAcf_quote':
            return <Quote key={block.id} {...block} />
          case 'WordPressAcf_team':
            return <Team key={block.id} {...block} />
          case 'WordPressAcf_logo_grid':
            return <LogoGrid key={block.id} {...block} />
          case 'WordPressAcf_awards':
            return <Awards key={block.id} {...block} />
          case 'WordPressAcf_tabs':
            return <Tabs key={block.id} {...block} />
          case 'WordPressAcf_contact_details':
            return <Contact key={block.id} {...block} />
          case 'WordPressAcf_image_with_text':
            return <ImageWithText key={block.id} {...block} />
          case 'WordPressAcf_solutions_tabs':
            return <SolutionsTabs key={block.id} {...block} />
          default:
            return null
        }
      })}
    </Wrapper>
    <Background />
  </PageBuilderContainer>
)

export default PageBuilder
