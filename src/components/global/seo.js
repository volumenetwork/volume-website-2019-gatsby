import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment SeoFragment on wordpress__PAGE {
    yoast_meta {
      yoast_wpseo_title
      yoast_wpseo_facebook_description
      yoast_wpseo_facebook_title
      yoast_wpseo_facebook_type
      yoast_wpseo_metadesc
      yoast_wpseo_twitter_description
      yoast_wpseo_twitter_title
      yoast_wpseo_canonical
      yoast_wpseo_facebook_image {
        localFile {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
      yoast_wpseo_company_name
      yoast_wpseo_social_defaults {
        twitter_card_type
        twitter_site
      }
    }
  }
`

function SEO({
  title,
  yoast_wpseo_title: yoastTitle,
  yoast_wpseo_metadesc: yoastDescription,
  yoast_wpseo_facebook_title: yoastFacebookTitle,
  yoast_wpseo_facebook_description: yoastFacebookDescription,
  yoast_wpseo_facebook_type: yoastFacebookType,
  yoast_wpseo_facebook_image: yoastFacebookImage,
  yoast_wpseo_twitter_title: yoastTwitterTitle,
  yoast_wpseo_twitter_description: yoastTwitterDescription,
  yoast_wpseo_canonical: yoastCanonical,
  yoast_wpseo_company_name: yoastCompanyName,
  yoast_wpseo_social_defaults
}) {
  const metaTitle = yoastTitle || `${title} | ${yoastCompanyName}`
  const metaDescription = yoastDescription || ''
  const facebookTitle = yoastFacebookTitle || yoastTitle || title
  const facebookDescription = yoastFacebookDescription || yoastDescription || ''
  const facebookType = yoastFacebookType || 'website'
  const twitterTitle = yoastTwitterTitle || yoastTitle || title
  const twitterDescription = yoastTwitterDescription || yoastDescription || ''
  const twitterHandle = yoast_wpseo_social_defaults.twitter_site || ''
  return (
    <Helmet
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: facebookTitle
        },
        {
          property: `og:description`,
          content: facebookDescription
        },
        {
          property: `og:type`,
          content: facebookType
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:creator`,
          content: twitterHandle
        },
        {
          name: `twitter:title`,
          content: twitterTitle
        },
        {
          name: `twitter:description`,
          content: twitterDescription
        }
      ]}
    >
      <link rel="canonical" href={yoastCanonical} />
      <html lang="en" />
    </Helmet>
  )
}

export default SEO
