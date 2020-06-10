import React from 'react'
import PropTypes from 'prop-types'
import Navbar from './navbar'
import Footer from './footer'
import './layout.css'

function DisplayFooter(props) {
  if (props.page === 'intro') {
    return null
  }
  return <Footer />
}

const Layout = ({ children, page }) => (
  <>
    <Navbar />
    {children}
    <DisplayFooter page={page} />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
