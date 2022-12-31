import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Footer = () => {
  const navigate = useNavigate()

  const [naviTodo, setNaviTodo] =useState()
  const [naviTimeItem, setNaviTimeItem] =useState()
  const [naviIllust, setNaviIllust] =useState()

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setNaviTodo('/todolist');
        setNaviTimeItem('/timeitem');
        setNaviIllust('/illust')
      }else{
        setNaviTodo('/');
        setNaviTimeItem('/');
        setNaviIllust('/')
      }
    })
  },[auth])

 



  return (
    <Container className="footer__container">
      <Row>
        <Col onClick={()=>{navigate(`${naviTodo}`)}} lg="4" xs="4">
          <p>퀘스트정리</p>
          <div><i className="ri-file-list-line"></i></div>
        </Col>
        <Col onClick={()=>{navigate(`${naviTimeItem}`)}}  lg="4" xs="4">
          <p>기간제아이템</p>
          <div><i className="ri-time-line"></i></div>
        </Col>
        <Col onClick={()=>{navigate(`${naviIllust}`)}}  lg="4" xs="4">
          <p>도감</p>
          <div><i className="ri-contacts-book-2-line"></i></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
