import React from "react"
import { Container } from "react-bootstrap"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TheatreParticipant from "../components/theatreParticipant"

const ParticipantsPage = () => {
  const query = useStaticQuery(graphql`
    query {
      theatres: allTheatresCsv(sort: { fields: Theatre, order: ASC }) {
        nodes {
          Theatre
          Website
          Logo
          Facebook
          Twitter
          Instagram
          YouTube
        }
      }
      images: allFile(filter: { relativeDirectory: { eq: "participants" } }) {
        edges {
          node {
            extension
            relativePath
            childImageSharp {
              fixed(width: 125, height: 125) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  const sections = query.theatres.nodes.map(theatre => {
    const image = query.images.edges.find(
      image => image.node.relativePath === `participants/${theatre.Logo}`
    )
    return <TheatreParticipant theatre={theatre} image={image} />
  })

  return (
    <Layout pageInfo={{ pageName: "participants" }}>
      <SEO title="Participants" />
      <h1>PARTICIPANTS</h1>
      <Container>{sections}</Container>
    </Layout>
  )
}

export default ParticipantsPage
