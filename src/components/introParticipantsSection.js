import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdbreact'

class IntroParticipantsSection extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const theatreData = this.props.theatreData

    const listItems = theatreData.map(theatre => (
      <p className="lead grey-text w-responsive mx-auto">{theatre.Theatre}</p>
    ))
    const half = Math.ceil(listItems.length / 2)
    const firstHalf = listItems.splice(0, half)
    const secondHalf = listItems.splice(-half)
    return (
      <MDBContainer style={{ marginTop: '5vh', marginBottom: '5vh' }}>
        <MDBRow>
          <MDBCol md="12" className="text-center">
            <h2 className="h1-responsive font-weight-bold my-5">
              Entertainment provided by...
            </h2>
            {/* <hr className="hr-dark my-4 w-75" /> */}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="white-text text-center">{firstHalf}</MDBCol>
          <MDBCol className="white-text text-center">{secondHalf}</MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default IntroParticipantsSection
