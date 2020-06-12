import React from "react"
import { Row, Col, Container, ListGroup } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CarouselComp from "../components/carousel"

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Container>
      <Row>
        <Col className="text-center text-white">
          <h2 className="font-weight-bold mb-0 pt-md-5 pt-5">
            Community Theatre Thrives
          </h2>
          <hr className="my-4 w-75" />
        </Col>
      </Row>
      <Row className="text-center text-white">
        <h5>
          As COVID-19 has forced us to adapt to a new reality of social
          distancing, the Washington, DC theatre community is proud to share our
          talents through this live-streamed telethon event. We hope you enjoy
          the variety of talent on display, and that you may think of providing
          a donation to support the theatrical arts in this time of hardship.
        </h5>
      </Row>
    </Container>
    <CarouselComp />
  </Layout>
)

export default IndexPage
