import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import MediaRow from './media-row'

export const fragment = graphql`
  fragment TextMediaRowsFragment on WordPressAcf_text_media_rows {
    id
    rows {
      section_id
      add_background_v_symbol
      media {
        image {
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        type_of_media
        case_study_link {
          title
          acf {
            project_details {
              description
              main_text
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
      text {
        box_text
        box_title
      }
    }
  }
`

const TextMediaRows = ({ rows }) => (
  <Outer>
    {rows.map((row, i) => (
      <MediaRow content={row} key={i} />
    ))}
  </Outer>
)

export default TextMediaRows

const Outer = styled.section`
  width: 100%;
  padding: 10rem 0;

  @media (max-width: 750px) {
    padding: 5rem 0 0;
  }
`
