import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "../images/logo.png";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";


const Footer = ({onMenu, setOnMenu}) => {
  const navigate = useNavigate();

 

  // 로그인정보가 있으면 todolist 없으면 로그인창으로 이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <Container className="footer__container">
      <Row xs={3}>
        <Col>
        <AiOutlineMenu onClick={()=>{setOnMenu(!onMenu)}}/>
        </Col>
        <Col>
          <img src={logo} alt="" width={40} />
        </Col>
        <Col><IoIosArrowBack /></Col>
      </Row>
    </Container>
  );
};

export default Footer;
