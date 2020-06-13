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

  async componentDidMount() {
    // Get a client token for authorization from your server
    const response = await fetch(process.env.BT_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${process.env.BT_BASE64}`,
        "Braintree-Version": "2020-06-12",
        "Content-Type": "application/json",
      },
      body: '{"query": "mutation {createClientToken {clientToken}}"}',
    })
    const clientResponse = await response.json()
    if (clientResponse.data) {
      const clientToken = clientResponse.data.createClientToken.clientToken
      this.setState({
        clientToken,
      })
    }
  }

  // async buy() {
  //   // Send the nonce to your server
  //   const { nonce } = await this.instance.requestPaymentMethod()
  //   // await fetch(`server.test/purchase/${nonce}`)

  //   const response = await fetch(process.env.BT_URL, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Basic ${process.env.BT_BASE64}`,
  //       "Braintree-Version": "2020-06-12",
  //       "Content-Type": "application/json",
  //     },
  //     body: `{
  //       "query": "mutation ExampleCharge($input: ChargePaymentMethodInput!) {
  //         chargePaymentMethod(input: $input) {
  //           transaction {
  //             id
  //             status
  //           }
  //         }
  //       }",
  //       "variables": {
  //         "input": {
  //           "paymentMethodId": "id_of_payment_method",
  //           "transaction": {
  //             "amount": "11.23"
  //           }
  //         }
  //       }
  //     }`,
  //   })
  // }

  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
          {JSON.stringify(this.state.clientToken)}
        </div>
      )
    } else {
      return (
        <Layout pageInfo={{ pageName: "donate" }}>
          <SEO title="Donate" />
          <h1>DONATE</h1>
          {/* <div>
            <DropIn
              options={{ authorization: this.state.clientToken }}
              onInstance={instance => (this.instance = instance)}
            />
            <button onClick={this.buy.bind(this)}>Buy</button>
          </div> */}
        </Layout>
      )
    }
  }
}

export default DonatePage
