import React from "react"
import { Link } from "gatsby"

import { Nav } from "react-bootstrap"

const HeaderNavLink = ({ pageInfo, linkTo, linkName }) => {
  return (
    <>
      <Nav className="mr-auto" activeKey={pageInfo && pageInfo.pageTo}>
        <Link to={linkTo} className="link-no-style">
          <Nav.Link as="span" eventKey={pageInfo.pageTo}>
            {linkName}
          </Nav.Link>
        </Link>
      </Nav>
    </>
  )
}

export default HeaderNavLink
