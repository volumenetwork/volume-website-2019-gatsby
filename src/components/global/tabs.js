import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import TabTitle from './tab-title'
import TabTitleSelect from './tab-titles-select'
import TabContent from './tab-content'

export const fragment = graphql`
  fragment TabsFragment on WordPressAcf_tabs {
    id
    title
    description
    background_colour
    section_id
    tabs {
      title
      content
      case_study_link {
        path
        title
        acf {
          project_details {
            description
            main_text
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1200, quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
      video_or_image
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      video_image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      video {
        localFile {
          url
        }
      }
      video_text
    }
  }
`

const Tabs = ({ title, description, tabs, background_colour: backgroundColour, section_id: sectionId }) => {
  const [tabActive, setTabActive] = useState(0)

  return (
    <Outer className={backgroundColour === 'white' ? 'background-white' : 'background-blue'}>
      <Anchor id={sectionId} />
      <Inner className="container">
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
        <TabTitles>
          {tabs.map((tab, i) => (
            <TabTitle title={tab.title} key={i} i={i} tabActive={tabActive} setTabActive={setTabActive} />
          ))}
        </TabTitles>
        <TabTitlesSelect onChange={e => setTabActive(parseInt(e.target.value))}>
          {tabs.map((tab, i) => (
            <TabTitleSelect title={tab.title} key={i} i={i} tabActive={tabActive} setTabActive={setTabActive} />
          ))}
        </TabTitlesSelect>
        {tabs.map((tab, i) => (
          <TabContent content={tab} key={i} i={i} tabActive={tabActive} />
        ))}
      </Inner>
    </Outer>
  )
}

export default Tabs

const Anchor = styled.div`
  position: absolute;
  top: -800px;
  width: 1px;
  height: 1px;
`

const Outer = styled.section`
  position: relative;
  padding: 10rem;
  background: ${props => props.theme.colours.blueBackground};

  @media (max-width: 1000px) {
    padding: 10rem 5rem;
  }

  @media (max-width: 850px) {
    padding: 10rem 0;
  }

  @media (max-width: 750px) {
    padding: 5rem 0;
  }

  &.background-white {
    background: #fff;
  }

  &.background-blue {
    background: ${props => props.theme.colours.blueBackground};
  }
`

const Inner = styled.div`
  max-width: 122rem;
`

const Title = styled.p`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.01rem;
  text-align: center;
  color: ${props => props.theme.colours.primary};
  margin-bottom: 4rem;

  @media (max-width: 750px) {
    margin-bottom: 2rem;
  }
`

const Description = styled.p`
  text-align: center;
  font-size: 2.4rem;
  line-height: 1.4;
  font-weight: 300;
  max-width: 59rem;
  margin: 0 auto 6rem;
`

const TabTitles = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;

  @media (max-width: 600px) {
    display: none;
  }
`

const TabTitlesSelect = styled.select`
  display: none;
  font-size: 2rem;
  font-weight: 500;
  -webkit-font-smoothing: auto;
  color: #fff;
  line-height: 1.3;
  padding: 2rem 3rem 2rem 2rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  border-radius: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMSIgdmlld0JveD0iMCAwIDIwIDExIj4KICA8cGF0aCBpZD0iUG9seWdvbl8yIiBkYXRhLW5hbWU9IlBvbHlnb24gMiIgZD0iTTEwLDAsMjAsMTFIMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDExKSByb3RhdGUoLTE4MCkiIGZpbGw9IiNmZmYiLz4KPC9zdmc+Cg=='),
    linear-gradient(to bottom, ${props => props.theme.colours.secondary} 0%, ${props => props.theme.colours.secondary} 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 2.5rem top 50%, 0 0;
  background-size: 1em auto, 100%;

  @media (max-width: 600px) {
    display: block;
  }

  &::-ms-expand {
    display: none;
  }

  &:focus {
    outline: none;
  }
`
