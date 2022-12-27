import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import logo from '../images/logo.png'

const Navbar = () => {
  return (
<Container className='navbar__container'>
    <Row>
        <Col lg='1' xs='1'><i className="ri-arrow-left-s-line"></i></Col>
        <Col lg='10' xs='10'><img src={logo} alt="" /></Col>
        <Col lg='1' xs='1'><i className="ri-shut-down-line"></i></Col>
    </Row>
</Container>
  )
}

export default Navbar
