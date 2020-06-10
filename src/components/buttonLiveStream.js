import React, { Component } from 'react'
import { Link } from 'gatsby'
import { MDBIcon, MDBBtn } from 'mdbreact'

class ButtonLiveStream extends Component {
  render() {
    return (
      <Link to="/live-stream" className="navbar-brand">
        <MDBBtn outline color="info">
          <MDBIcon fab fab icon="youtube" className="mr-2" /> Live Stream
        </MDBBtn>
      </Link>
    )
  }
}

export default ButtonLiveStream
