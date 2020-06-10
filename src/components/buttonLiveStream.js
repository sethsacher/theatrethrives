import React, { Component } from 'react'
import { MDBIcon, MDBBtn } from 'mdbreact'

class ButtonLiveStream extends Component {
  render() {
    return (
      <MDBBtn outline color="info">
        <MDBIcon fab fab icon="youtube" className="mr-2" /> Live Stream
      </MDBBtn>
    )
  }
}

export default ButtonLiveStream
