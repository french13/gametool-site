import React from "react";
import "../styles/loginRegister.scss";
import {
  Container,
  Row,
  Form,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container className="login__container">
      <Row>
        <Form>
          <p>Login</p>
          <Input type="email" id="email" name="userId" placeholder="e-mail"/>
          <Input type="password" id="password" name="userPassword" placeholder="password"/>
          <Button>로그인</Button>
        </Form>
        <p>회원이 아니신가요? <Link to='/register'>회원가입</Link></p>
      </Row>
    </Container>
  );
};

export default Login;
