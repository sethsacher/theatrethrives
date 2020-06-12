import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { Container, Row } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ScheduleItem from "../components/scheduleItem"

const SchedulePage = () => {
  const query = useStaticQuery(graphql`
    query {
      events: allScheduleCsv {
        nodes {
          Description
          Event
          Image
          Time
        }
      }
    }
  `)
  const events = query.events.nodes.map(event => {
    return <ScheduleItem event={event} />
  })
  return (
    <Layout pageInfo={{ pageName: "schedule" }}>
      <SEO title="Schedule" />
      <Container>
        <Row>
          <h2>Event Schedule</h2>
        </Row>
        <Row>
          <p>Here is our event schedule</p>
        </Row>
        {events}
      </Container>
    </Layout>
  )
}

export default SchedulePage
