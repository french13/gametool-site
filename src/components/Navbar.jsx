import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {BsCardList} from "react-icons/bs"
import {AiOutlineClockCircle} from "react-icons/ai"
import {GiMonsterGrasp} from "react-icons/gi"
import {FiLogOut} from "react-icons/fi"
import { useSelector } from "react-redux";

const Navbar = ({setOnMenu}) => {
  const navigate = useNavigate();
  let illustQuantity = useSelector((state)=>{return state.illustQuantity})


  return (
    <Container id="navbar__container">
      <Row>
        <Col xs={4}>
        <BsCardList/>
        </Col>
        <Col xs={8}
          onClick={() => {
            navigate("/todolist"); setOnMenu(false)
          }}
        >
          todo
        </Col>
      </Row>
      <Row>
      <Col xs={4}>
      <AiOutlineClockCircle />
        </Col>
        <Col xs={8}
          onClick={() => {
            navigate("/timeitem"); setOnMenu(false)
          }}
        >
          time
        </Col>
      </Row>
      <Row>
      <Col xs={4}>
      <GiMonsterGrasp />
        </Col>
        <Col xs={8}
          onClick={() => {
            navigate("/illust"); setOnMenu(false)
          }}
        >
         <span>illust</span> 
         <span style={{marginLeft : "30%", color : "red", fontWeight: "900"}}>{illustQuantity}</span>
        </Col>
      </Row>
      <Row className="logoutButton">
      <Col xs={4}>
      <FiLogOut />
      </Col>
        <Col  xs={8}
          onClick={() => {
            signOut(auth).then(() => {
              console.log("로그아웃");
              setOnMenu(false);
            });
          }}
        >
          Logout
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
