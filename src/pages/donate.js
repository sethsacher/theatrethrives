import React from "react"
import { Link } from "gatsby"

import DropIn from "braintree-web-drop-in-react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const DonatePage = () => {
  return (
    <Layout pageInfo={{ pageName: "donate" }}>
      <SEO title="Donate" />
      <h1>DONATE</h1>
    </Layout>
  )
}

export default DonatePage
