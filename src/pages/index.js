import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Intro from '../components/mask'
import SEO from '../components/seo'
import Carousel from '../components/carousel'
import AboutSection from '../components/aboutSection'
import IntroParticipantsSection from '../components/introParticipantsSection'
import Card from '../components/card'
import { MDBRow } from 'mdbreact'

class App extends Component {
  render() {
    return (
      <>
        <Layout>
          <SEO
            title="Home"
            keywords={[
              `gatsby`,
              `MDBReact`,
              `react`,
              `Material Design For Bootstrap`,
            ]}
          />
          <Carousel />
          <Intro />
          <main>
            <IntroParticipantsSection
              theatreData={this.props.data.allTheatresCsv.nodes}
            />
          </main>
        </Layout>
      </>
    )
  }
}

export const query = graphql`
  query {
    allTheatresCsv(sort: { fields: Theatre, order: ASC }) {
      nodes {
        Facebook
        Theatre
        Twitter
        Website
      }
    }
  }
`

export default App
