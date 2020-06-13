import React from "react"
import { Link } from "gatsby"

// import DropIn from "braintree-web-drop-in-react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class DonatePage extends React.Component {
  instance

  state = {
    clientToken: null,
  }

  // async componentDidMount() {
  //   // Get a client token for authorization from your server
  //   const response = await fetch("server.test/client_token")
  //   const clientToken = await response.json() // If returned as JSON string

  //   this.setState({
  //     clientToken,
  //   })
  // }

  // async buy() {
  //   // Send the nonce to your server
  //   const { nonce } = await this.instance.requestPaymentMethod()
  //   await fetch(`server.test/purchase/${nonce}`)
  // }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
          {process.env.BT_ENVIRONMENT}
        </div>
      )
    } else {
      return (
        <Layout pageInfo={{ pageName: "donate" }}>
          <SEO title="Donate" />
          <h1>DONATE</h1>
        </Layout>
      )
    }
  }
}

export default DonatePage
