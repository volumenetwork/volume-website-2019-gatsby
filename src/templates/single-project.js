import React from 'react'
import { graphql } from 'gatsby'
// import SEO from '../components/global/seo'

export default ({ data }) => (
  <>
    {/* <SEO title="Volume Network | Home page" /> */}
    <p>Title: {data.wordpressWpProjects.title}</p>
  </>
)

export const query = graphql`
  query($wordpressId: Int!) {
    wordpressWpProjects(wordpress_id: { eq: $wordpressId }) {
      title
      path
      acf {
        project_details {
          description
          image {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1500) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
