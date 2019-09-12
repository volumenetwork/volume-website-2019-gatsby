const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            title
            template
            path
            wordpress_id
          }
        }
      }
      allWordpressWpProjects {
        edges {
          node {
            wordpress_id
            path
            title
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPage, allWordpressWpProjects } = result.data

  // Create Page pages.
  const templateDefault = path.resolve(`./src/templates/index.js`)
  allWordpressPage.edges.forEach(edge => {
    createPage({
      path: edge.node.path,
      component: slash(templateDefault),
      context: {
        id: edge.node.wordpress_id,
        title: edge.node.title,
        wordpressId: edge.node.wordpress_id
      }
    })
  })

  // Create single product pages.
  const templateSingleProject = path.resolve(`./src/templates/single-project.js`)
  allWordpressWpProjects.edges.forEach(edge => {
    createPage({
      path: edge.node.path,
      component: slash(templateSingleProject),
      context: {
        id: edge.node.wordpress_id,
        title: edge.node.title,
        wordpressId: edge.node.wordpress_id
      }
    })
  })
}
