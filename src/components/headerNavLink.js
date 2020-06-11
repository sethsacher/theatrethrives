import React from "react"
import { Link } from "gatsby"

import { Nav } from "react-bootstrap"

const HeaderNavLink = ({ pageInfo, linkTo, linkName }) => {
  // activeKey matches eventKey to determine what tab is active
  return (
    <>
      <Nav className="ml-auto" activeKey={pageInfo.pageName}>
        <Link to={`/${linkTo}`} className="link-no-style">
          <Nav.Link as="span" eventKey={linkTo}>
            {linkName}
          </Nav.Link>
        </Link>
      </Nav>
    </>
  )
}

export default HeaderNavLink
