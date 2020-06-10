import React, { Component } from 'react'
import { Link } from 'gatsby'
import { MDBIcon, MDBBtn } from 'mdbreact'

class ButtonDonate extends Component {
  render() {
    return (
      <Link to="/donate" className="navbar-brand">
        <MDBBtn color="info">
          <MDBIcon icon="hand-holding-heart" className="mr-2" /> Donate
        </MDBBtn>
      </Link>
    )
  }
}

export default ButtonDonate
