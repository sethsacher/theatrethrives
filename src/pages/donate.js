import React from "react"
import { Link } from "gatsby"
import { Form, Button } from "react-bootstrap"

import DropIn from "braintree-web-drop-in-react"
import Layout from "../components/layout"
import SEO from "../components/seo"

class DonatePage extends React.Component {
  instance

  state = {
    clientToken: null,
    submit: false,
    nonce: null,
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
      this.setState({
        clientToken: clientResponse.data.createClientToken.clientToken,
      })
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    if (!this.state.nonce) {
      // Send submitted payment method; get nonce
      const responsePaymentMethod = await this.instance.requestPaymentMethod()
      console.log(JSON.stringify(responsePaymentMethod))
      this.setState({ nonce: responsePaymentMethod.nonce })
    } else {
      // Use nonce to charge the payment method
      const response = await fetch(process.env.BT_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${process.env.BT_BASE64}`,
          "Braintree-Version": "2020-06-12",
          "Content-Type": "application/json",
        },
        body: `{
        "query": "mutation ExampleCharge($input: ChargePaymentMethodInput!) {
          chargePaymentMethod(input: $input) {
            transaction {
              id
              status
            }
          }
        }",
        "variables": {
          "input": {
            "paymentMethodId": "${this.state.nonce}",
            "transaction": {
              "amount": "11.23"
            }
          }
        }
      }`,
      })
      console.log(JSON.stringify(response))
      this.setState({ submit: true })
    }
  }

  DonationForm = () => {
    // Confirmation page
    if (this.state.submit && this.state.submit === true) {
      return <h4>Submitted!</h4>
    }
    // Wait for client token to be fetched
    if (!this.state.clientToken) {
      return <h4>Loading...</h4>
    }
    // Main payment form
    return (
      <Form id="donation-form" onSubmit={this.handleSubmit}>
        <Form.Group controlId="donationAmount">Amount</Form.Group>
        <Form.Group controlId="braintreeDropIn">
          <DropIn
            options={{ authorization: this.state.clientToken }}
            onInstance={instance => (this.instance = instance)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {this.state.nonce ? "Donate" : "Check Payment"}
        </Button>
      </Form>
    )
  }

  render() {
    return (
      <Layout pageInfo={{ pageName: "donate" }}>
        <SEO title="Donate" />
        <h1>DONATE</h1>
        <this.DonationForm />
      </Layout>
    )
  }
}

export default DonatePage
