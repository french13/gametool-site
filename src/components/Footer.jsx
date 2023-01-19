import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import logo from "../images/logo.png";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";

const Footer = ({ onMenu, setOnMenu }) => {

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)
  // 로그인정보가 있으면 todolist 없으면 로그인창으로 이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true)
      } else {
        navigate("/");
        setIsLogin(false)
      }
    });
  }, []);

  return (
    <>
    {
      isLogin === true ?
      <Container className="footer__container">
      <Row xs={3}>
        <Col
          onClick={() => {
            setOnMenu(!onMenu);
          }}
        >
          <AiOutlineMenu />
        </Col>
        <Col
          onClick={() => {
            navigate("/todolist");
          }}
        >
          <img src={logo} alt="" width={40} />
        </Col>
        <Col
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoIosArrowBack />
        </Col>
      </Row>
    </Container> : null
    }
    </>
  );
};

export default Footer;
