// Require dotenv package (already a dep of Gatsby)
// https://www.gatsbyjs.org/docs/environment-variables/#server-side-nodejs
require('dotenv').config({
  path: `.env`
})

module.exports = {
  siteMetadata: {
    title: `Volume Network`,
    description: `Gatsby site for Volume Network.`,
    author: `Kota Creative`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `volume-network`,
        short_name: `volume`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3973B7`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: process.env.WORDPRESS_URL,
        protocol: process.env.PROTOCOL,
        hostingWPCOM: false,
        useACF: true,
        verboseOutput: false,
        perPage: 10,
        acfOptionPageIds: ['global-options'],
        searchAndReplaceContentUrls: {
          sourceUrl: process.env.REPLACE_SOURCE_URL,
          replacementUrl: process.env.REPLACE_NEW_URL
        },
        concurrentRequests: 10,
        includedRoutes: ['**/pages', '**/menus', '**/projects', '**/media']
      }
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        fileName: false,
        pure: true
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    },
  ],
  mapping: {
    'wordpress__PAGE.acf.hero.button_link': `wordpress__PAGE.wordpress_id`,
    'WordPressAcf_call_to_action.button_link': `wordpress__PAGE.wordpress_id`,
    'WordPressAcf_latest_projects.projects': `wordpress__wp_projects.wordpress_id`,
    'WordPressAcf_text_media_rows.rows.media.case_study_link': `wordpress__wp_projects.wordpress_id`,
    'WordPressAcf_tabs.tabs.case_study_link': `wordpress__wp_projects.wordpress_id`
  }
}
