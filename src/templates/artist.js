import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import HTMLContent from "../components/Content"
import "../styles/about-page.scss"

export const ArtistPageTemplate = props => {
  return <div>artist oi</div>
}

const ArtistPage = ({ data }) => {
  //   const { markdownRemark: page, footerData, navbarData } = data
  //   const {
  //     frontmatter: {
  //       seo: { title: seoTitle, description: seoDescription, browserTitle }
  //     }
  //   } = page

  console.log(data)
  return (
    <Layout>
      {/* <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet> */}
      <ArtistPageTemplate data={data} />
    </Layout>
  )
}

ArtistPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default ArtistPage

export const artistPageQuery = graphql`
  query ArtistPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        realName
        links {
          url
          name
        }
      }
    }
  }
`
