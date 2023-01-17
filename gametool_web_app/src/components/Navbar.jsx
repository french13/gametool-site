import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // 로그인정보가 있으면 todolist 없으면 로그인창으로 이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/todolist");
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <Container className="navbar__container">
      <Row>
        <Col lg="1" xs="1">
          <i className="ri-arrow-left-s-line"></i>
        </Col>
        <Col lg="10" xs="10">
          <img src={logo} alt="" />
        </Col>
        <Col lg="1" xs="1">
          <i
            className="ri-shut-down-line"
            onClick={() => {
              signOut(auth).then(() => {
                console.log("로그아웃");
              });
            }}
          ></i>
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
