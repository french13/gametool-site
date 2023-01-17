import React, { useState } from "react";
import "../styles/loginRegister.scss";
import {
  Container,
  Row,
  Form,
  Input,
  Button,
  InputGroup,
} from "react-bootstrap";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // 로그인 기능
  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, id, pw)
      .then((result) => {
        alert("login성공");
        console.log(result.user);
      })
      .catch((error) => {
        alert("login실패");
        alert(error.message);
      });
  };

  return (
    <Container className="loginContainer">
      <Row>
        <Form onSubmit={login}>
          <header>Login</header>
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setId(e.target.value);
              }}
              type="email"
              id="email"
              name="userId"
              placeholder="e-mail"
            />
          </InputGroup>
          <InputGroup>
            <Form.Control
              onChange={(e) => {
                setPw(e.target.value);
              }}
              type="password"
              id="password"
              name="userPassword"
              placeholder="password"
            />
          </InputGroup>
          <Button className="loginButton">로그인</Button>
        </Form>
        <p>
          회원이 아니신가요? <Link to="/register">회원가입</Link>
        </p>
      </Row>
    </Container>
  );
};

export default Login;
