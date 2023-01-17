import React, { useEffect, useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Button, Form, InputGroup } from "react-bootstrap";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getUserDoc } from "../apis/apis";
import { MdOutlineDone } from "react-icons/md";
import styled from "styled-components";

const TrueSpan = styled.span`
  color: green;
`;
const FalseSpan = styled.span`
  color: red;
`;

const Register = () => {
  // email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [idCheckButton, setIdCheckButton] = useState(false);

  // email, password, passwordConfirm (text)
  const [idVaildText, setIdVaildText] = useState(false);
  const [passwordVaildText, setPasswordVaildText] = useState(false);
  const [passwordConfirmText, setPasswordConfirmText] = useState(false);

  const [signupButton, setSignupButton] = useState(true);

  // 정규식
  const idVaild =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordVaild = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-8]).{8,25}$/;

  // id input value 넣기 와 유효성 검사
  const idInput = async (e) => {
    setIdCheckButton(false)
    setEmail(e.target.value);
    setIdVaildText(idVaild.test(e.target.value));
  };
  // password input value 넣기 와 유효성 검사
  const passwordInput = (e) => {
    setPassword(e.target.value);
    setPasswordVaildText(passwordVaild.test(e.target.value));
  };
  //  비밀번호 재확인 체크
  const passwordConfirmInput = (e) => {
    setPasswordConfirmText(password == e.target.value);
  };

  // id, pw, pw확인 유효성 모두 통과했을경우 회원가입 버튼 활성화
  useEffect(() => {
    if (
      idVaildText &&
      passwordVaildText &&
      passwordConfirmText &&
      idCheckButton
    ) {
      setSignupButton(false);
    } else {
      setSignupButton(true);
    }
  }, [email, password, passwordConfirmText, idCheckButton]);

  // 회원가입
  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        alert("가입성공");
      })
      .catch((error) => {
        alert(error.message);
      });
    await updateProfile(auth.currentUser, { displayName: email })
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: email,
      date: serverTimestamp(),
      uid: auth.currentUser.uid,
    });
    await setDoc(doc(db, "todolist", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      email: email,
      time: serverTimestamp(),
    });
    await setDoc(doc(db, "timeitem", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      email: email,
      time: serverTimestamp(),
    });
    await setDoc(doc(db, "myillust", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      email: email,
      time: serverTimestamp(),
    });
  };
  // 아이디 중복확인
  const idCheck = async () => {
    setIdCheckButton(true);
    const FetchId = await getDocs(getUserDoc("users", "email", email));
    FetchId.forEach((doc) => {
      if (doc.exists()) {
        alert("존재하는 아이디입니다.");
        setIdCheckButton(false);
      }
    });
  };

  return (
    <Container className="registerContainer">
      <header>Sign Up</header>
      <Row>
        <Form className="registerForm" onSubmit={register}>
          {/* email Input */}
          <InputGroup>
            <Form.Control
              onChange={idInput}
              type="email"
              name="userId"
              placeholder="이메일"
            />
            <Button disabled={!idVaildText} onClick={idCheck}>
              {idCheckButton === true ? <MdOutlineDone /> : "중복확인"}
            </Button>
          </InputGroup>
          <Form.Label>
            {idVaildText == true ? (
              <TrueSpan>올바른 이메일 형식입니다</TrueSpan>
            ) : (
              <span>
                <FalseSpan>이메일 형식이 아닙니다.</FalseSpan>
              </span>
            )}
          </Form.Label>
          {/* password Input */}
          <InputGroup>
            <Form.Control
              onChange={passwordInput}
              type="password"
              name="userPassword"
              placeholder="비밀번호 (영문+숫자+특수문자 8글자이상 25글자이하)"
            />
          </InputGroup>
          <Form.Label>
            {passwordVaildText == true ? (
              <TrueSpan>올바른 비밀번호입니다</TrueSpan>
            ) : (
              <FalseSpan>잘못된 비밀번호형식입니다.</FalseSpan>
            )}
          </Form.Label>

          {/* passwordConfirm Input */}

          <InputGroup>
            <Form.Control
              onChange={passwordConfirmInput}
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
            />
          </InputGroup>
          <Form.Label>
            {passwordConfirmText == true ? (
              <TrueSpan>비밀번호가 일치합니다</TrueSpan>
            ) : (
              <FalseSpan>비밀번호가 일치하지 않습니다</FalseSpan>
            )}
          </Form.Label>
          <Button
            onClick={register}
            className="registerButton"
            disabled={signupButton}
          >
            회원가입
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
