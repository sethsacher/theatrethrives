import React, { Component } from 'react'
import { MDBIcon, MDBBtn } from 'mdbreact'

class ButtonDonate extends Component {
  render() {
    return (
      <MDBBtn color="info">
        <MDBIcon icon="hand-holding-heart" className="mr-2" /> Donate
      </MDBBtn>
    )
  }
}

export default ButtonDonate
