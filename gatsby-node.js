const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              path
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const artists = result.data.allMarkdownRemark.edges.filter(
      edge => edge.node.frontmatter.templateKey === "artist"
    )

    artists.forEach(edge => {
      console.log(JSON.stringify(edge.node.frontmatter))
      createPage({
        path: `/artists/${edge.node.frontmatter.path}`,
        component: path.resolve(`src/templates/artist.js`),
        context: {
          id: edge.node.id
        }
      })
    })

    // Filter out the footer, navbar, and meetups so we don't create pages for those
    const postOrPage = result.data.allMarkdownRemark.edges.filter(edge => {
      if (
        edge.node.frontmatter.templateKey === "navbar" ||
        edge.node.frontmatter.templateKey === "footer" ||
        edge.node.frontmatter.templateKey === "artist"
      ) {
        return false
      }
      return true
    })

    postOrPage.forEach(edge => {
      let component, pathName
      if (edge.node.frontmatter.templateKey === "home-page") {
        pathName = "/"
        component = path.resolve(`src/pages/index.js`)
      } else {
        pathName = edge.node.frontmatter.path || edge.node.fields.slug
        component = path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        )
      }
      const id = edge.node.id
      createPage({
        path: pathName,
        component,
        // additional data can be passed via context
        context: {
          id
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value
    })
  }
}
