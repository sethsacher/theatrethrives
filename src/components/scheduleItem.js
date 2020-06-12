/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import { Col, Row } from "react-bootstrap"
import Img from "gatsby-image"

const ScheduleItem = ({ event }) => {
  console.log(JSON.stringify(event))
  return (
    <Row>
      <Col md="2">
        <time>{event.Time}</time>
      </Col>
      <Col md="10">
        <h4>{event.Event}</h4>
        <p>{event.Description}</p>
      </Col>
    </Row>
  )
}

export default ScheduleItem
