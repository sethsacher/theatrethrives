import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBIcon, MDBRow, MDBCol } from 'mdbreact'
import ButtonDonate from './buttonDonate'
import ButtonLiveStream from './buttonLiveStream'
import Countdown from './countdown'

class Intro extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      // TODO: The margin bottom impacts the display of the next section;
      // how can this be dynamic?
      <MDBContainer class="intro">
        <MDBRow>
          <MDBCol md="12" className="white-text text-center">
            <h2 className="h1-responsive font-weight-bold white-text mb-0 pt-md-5 pt-5">
              Community Theatre Thrives
            </h2>
            <hr className="hr-light my-4 w-75" />
          </MDBCol>
        </MDBRow>
        <MDBRow className="white-text text-center">
          <h5>
            As COVID-19 has forced us to adapt to a new reality of social
            distancing, the Washington, DC theatre community is proud to share
            our talents through this live-streamed telethon event. We hope you
            enjoy the variety of talent on display, and that you may think of
            providing a donation to support the theatrical arts in this time of
            hardship.
          </h5>
        </MDBRow>
        {/* <MDBRow className="justify-content-center pt-3">
          <MDBCol md="12" className="white-text text-center">
            <ButtonDonate />
            <ButtonLiveStream />
          </MDBCol>
        </MDBRow> */}
        <Countdown />
      </MDBContainer>
    )
  }
}

export default Intro
