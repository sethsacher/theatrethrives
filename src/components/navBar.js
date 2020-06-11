import React from "react"
import { Link } from "gatsby"

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap"
import HeaderNavLink from "./headerNavLink"

const CustomNavbar = ({ pageInfo }) => {
  // console.log(pageInfo)
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        <Container>
          <Link to="/" className="link-no-style">
            <Navbar.Brand as="span">Community Theatre Thrives</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <HeaderNavLink
              pageInfo={pageInfo}
              linkTo="about"
              linkName="About"
            />
            <HeaderNavLink
              pageInfo={pageInfo}
              linkTo="participants"
              linkName="Participants"
            />
            <HeaderNavLink
              pageInfo={pageInfo}
              linkTo="sponsors"
              linkName="Sponsors"
            />
            <HeaderNavLink
              pageInfo={pageInfo}
              linkTo="schedule"
              linkName="Schedule"
            />
            <Nav className="ml-auto">
              <Link to="/donate" className="link-no-style">
                <Button>Donate</Button>
              </Link>
              <Link to="/live-stream" className="link-no-style">
                <Button>Live Stream</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default CustomNavbar
