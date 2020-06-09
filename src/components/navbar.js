import React, { Component } from 'react'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBBtn,
} from 'mdbreact'
import { Link } from 'gatsby'
import CustomNavLink from './customLink'
import { ReactComponent as Logo } from '../images/CTTFinal.svg'

class NavbarPage extends Component {
  state = {
    isOpen: false,
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBContainer>
          <Link to="/" className="navbar-brand">
            <Logo />
          </Link>
          <MDBNavbarToggler
            name="navbar-toggler"
            onClick={this.toggleCollapse}
          />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <CustomNavLink to="#!">Home</CustomNavLink>
              <CustomNavLink to="#!">About</CustomNavLink>
              <CustomNavLink to="#!">Projects</CustomNavLink>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret>
                    <div className="d-none d-md-inline">About</div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu right>
                    <MDBDropdownItem href="#!">Contact</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Articles</MDBDropdownItem>
                    <MDBDropdownItem href="#!">Testimonials</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <div className="d-flex align-items-center">
                <CustomNavLink to="#!">
                  <MDBIcon fab icon="facebook" className="ml-1" />
                </CustomNavLink>
                <CustomNavLink to="#!">
                  <MDBIcon fab icon="twitter" className="ml-1" />
                </CustomNavLink>
                <MDBBtn color="info">
                  <MDBIcon icon="home" className="mr-2" /> Donate
                </MDBBtn>
              </div>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    )
  }
}

export default NavbarPage
