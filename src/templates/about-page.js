import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import Helmet from "react-helmet"

import Layout from "../components/Layout"
import HTMLContent from "../components/Content"
import "../styles/about-page.scss"

export const AboutPageTemplate = props => {
  const { page } = props

  return <article className="about">HELLO</article>
}

const AboutPage = ({ data }) => {
  const { markdownRemark: page, footerData, navbarData } = data
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle }
    }
  } = page

  console.log(data)
  return (
    <Layout footerData={footerData} navbarData={navbarData}>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <div>{JSON.stringify(data)}</div>
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        seo {
          browserTitle
          title
          description
        }
      }
    }
    ...LayoutFragment
  }
`
