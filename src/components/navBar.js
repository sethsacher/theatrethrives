import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import HeaderNavLink from "./headerNavLink"

const CustomNavbar = ({ pageInfo }) => {
  console.log(pageInfo)
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        {/* <Container> */}
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">Gatsby React Bootstrap</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <HeaderNavLink pageInfo={pageInfo} linkTo="about" linkName="About" />
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
            <Form inline onSubmit={e => e.preventDefault()}>
              <Form.Group>
                <FormControl
                  type="text"
                  placeholder="Fake Search"
                  className="mr-2"
                />
              </Form.Group>
              <Button>Fake Button</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export default CustomNavbar
