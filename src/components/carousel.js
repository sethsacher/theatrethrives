/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"

import { Carousel, View, Mask } from "react-bootstrap"

import image1 from "../images/RCP_GGLAM.jpg"
import image2 from "../images/RCP_Aida.jpg"
import image3 from "../images/RCP_TMM.jpg"

const CarouselComp = () => (
  <Carousel>
    <Carousel.Item>
      <img className="d-block w-100" src={image1} alt="First slide" />
    </Carousel.Item>
  </Carousel>
)

export default CarouselComp
