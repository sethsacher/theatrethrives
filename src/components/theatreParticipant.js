/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import { Container, Row } from "react-bootstrap"
import Img from "gatsby-image"

const TheatreParticipant = ({ theatre, image }) => {
  const DisplayImage = () => {
    if (image) {
      return (
        <Img
          fixed={image.node.childImageSharp.fixed}
          alt={`${theatre.Theatre} Logo`}
        />
      )
    }
    return null
  }
  return (
    <Row>
      <DisplayImage />
      <p>{theatre.Theatre}</p>
      <p>{theatre.Website}</p>
      <p>{theatre.Facebook}</p>
      <p>{theatre.Twitter}</p>
      <p>{theatre.Instagram}</p>
      <p>{theatre.YouTube}</p>
    </Row>
  )
}

export default TheatreParticipant
