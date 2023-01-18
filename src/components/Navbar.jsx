import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../images/logo.png";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  // 로그인정보가 있으면 todolist 없으면 로그인창으로 이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/todolist");
        setIsLogin(true);
      } else {
        navigate("/");
        setIsLogin(false);
      }
    });
  }, []);

  return (
    <Container className="navbar__container">
      <Row className="d-flex align-items-center fs-1">
        <Col xs="1">{isLogin === true ? <IoIosArrowBack/> : null}</Col>
        <Col xs="10">
          <img src={logo} alt="" width={40} />
        </Col>
        <Col xs="1">
          {isLogin === true ? (
            <BiLogOutCircle
              onClick={() => {
                signOut(auth).then(() => {
                  console.log("로그아웃");
                });
              }}
            />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
