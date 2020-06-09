import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdbreact'

class Intro extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const theatreData = this.props.allTheatresCsv.edges

    const listItems = theatreData.map(theatre => (
      <h4 className="subtext-header h4-responsive mt-2 mb-4">
        {theatre.node.field1}
      </h4>
    ))
    const half = Math.ceil(listItems.length / 2)
    const firstHalf = listItems.splice(0, half)
    const secondHalf = listItems.splice(-half)
    return (
      <MDBContainer style={{ marginTop: '25vh', marginBottom: '50vh' }}>
        <MDBRow>
          <MDBCol md="12" className="white-text text-center">
            <h2 className="h1-responsive font-weight-bold white-text mb-0 pt-md-5 pt-5">
              Community Theatre Thrives
            </h2>
            <hr className="hr-light my-4 w-75" />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="white-text text-center">{firstHalf}</MDBCol>
          <MDBCol className="white-text text-center">{secondHalf}</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12" className="white-text text-center">
            <MDBBtn color="info">
              <MDBIcon icon="home" className="mr-2" /> Visit us
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default Intro
