import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LiveStreamPage = () => (
  <Layout pageInfo={{ pageName: "live-stream" }}>
    <SEO title="Live Stream" />
    <h1>LIVE STREAM</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default LiveStreamPage
