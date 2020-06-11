import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SchedulePage = () => (
  <Layout pageInfo={{ pageName: "schedule" }}>
    <SEO title="Schedule" />
    <h1>SCHEDULE</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SchedulePage
