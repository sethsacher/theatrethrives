import React from "react"
import { Link } from "gatsby"

import { ResponsiveEmbed } from "react-bootstrap"
import YouTube from "react-youtube"
import Layout from "../components/layout"
import SEO from "../components/seo"

const LiveStreamPage = () => {
  return (
    <Layout pageInfo={{ pageName: "live-stream" }}>
      <SEO title="Live Stream" />
      <h1>LIVE STREAM</h1>
      <YouTube videoId="hf7Wn3ZsnMc" />
    </Layout>
  )
}

export default LiveStreamPage
