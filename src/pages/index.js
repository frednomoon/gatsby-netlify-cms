import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import isAfter from "date-fns/is_after"

import Layout from "../components/Layout"
// import Map from "../components/Map"
// import HeadshotPlaceholder from "../img/headshot-placeholder.svg"
// import CustomLink from "../components/CustomLink"
import "../styles/home.scss"

export const HomePageTemplate = props => {
  console.log(props)
  return <>yolo dece</>
}

class HomePage extends React.Component {
  render() {
    const { data } = this.props
    const {
      data: { footerData, navbarData }
    } = this.props
    const { frontmatter: home } = data.homePageData.edges[0].node
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle }
    } = home
    let upcomingMeetup = null
    // Find the next meetup that is closest to today
    data.allMarkdownRemark.edges.every(item => {
      const { frontmatter: meetup } = item.node
      if (isAfter(meetup.rawDate, new Date())) {
        upcomingMeetup = meetup
        return true
      } else {
        return false
      }
    })
    return (
      <Layout footerData={footerData} navbarData={navbarData}>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} upcomingMeetup={upcomingMeetup} />
      </Layout>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery {
    ...LayoutFragment
    homePageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image
              imageAlt
            }
            upcomingMeetupHeading
            noUpcomingMeetupText
            mapsNote
            callToActions {
              firstCTA {
                heading
                subHeading
                linkType
                linkURL
              }
              secondCTA {
                heading
                subHeading
                linkType
                linkURL
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`
