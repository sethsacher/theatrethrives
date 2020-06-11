import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const DonatePage = () => (
  <Layout pageInfo={{ pageName: "donate" }}>
    <SEO title="Donate" />
    <h1>DONATE</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default DonatePage
