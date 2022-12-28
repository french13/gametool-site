import React, {useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Form, Input, Button } from "reactstrap";
import { auth } from "../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
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
        console.log(result.user)

      }).catch((error) => {
        alert("login실패");
        alert(error.message);
      });
  };

  return (
    <Container className="login__container">
      <Row>
        <Form onSubmit={login}>
          <p>Login</p>
          <Input
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="email"
            id="email"
            name="userId"
            placeholder="e-mail"
          />
          <Input
            onChange={(e) => {
              setPw(e.target.value);
            }}
            type="password"
            id="password"
            name="userPassword"
            placeholder="password"
          />
          <Button type="submit" onClick={login}>
            로그인
          </Button>
        </Form>
        <p>
          회원이 아니신가요? <Link to="/register">회원가입</Link>
        </p>
      </Row>
    </Container>
  );
};

export default Login;
