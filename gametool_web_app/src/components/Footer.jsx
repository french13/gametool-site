import React from "react";
import { Container, Row, Col } from "reactstrap";

const Footer = () => {
  return (
    <Container className="footer__container">
      <Row>
        <Col lg="4" xs="4">
          <p>퀘스트정리</p>
          <div><i className="ri-file-list-line"></i></div>
        </Col>
        <Col lg="4" xs="4">
          <p>기간제아이템</p>
          <div><i className="ri-time-line"></i></div>
        </Col>
        <Col lg="4" xs="4">
          <p>도감</p>
          <div><i className="ri-contacts-book-2-line"></i></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
