import React from "react"
// import { Link } from "gatsby"
import { Form, Button } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"

class DonatePage extends React.Component {
  instance

  state = {
    clientToken: null,
    submit: false,
    nonce: null,
  }

  // async componentDidMount() {

  // }

  // handleSubmit = async event => {
  //   event.preventDefault()
  //     this.state({
  //       submit: true
  //     })
  //   }
  // }

  // DonationForm = () => {
  //   // Confirmation page
  //   if (this.state.submit && this.state.submit === true) {
  //     return <h4>Submitted!</h4>
  //   }
  //   // Main payment form
  //   return (
  //     <Form id="donation-form" onSubmit={this.handleSubmit}>
  //       <Form.Group controlId="donationAmount">Amount</Form.Group>
  //       <Button variant="primary" type="submit">
  //         {this.state.nonce ? "Donate" : "Check Payment"}
  //       </Button>
  //     </Form>
  //   )
  // }

  render() {
    return (
      <Layout pageInfo={{ pageName: "donate" }}>
        <SEO title="Donate" />
        <h1>DONATE</h1>
        {/* <this.DonationForm /> */}
      </Layout>
    )
  }
}

export default DonatePage
