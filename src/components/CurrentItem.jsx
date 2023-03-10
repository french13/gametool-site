import React from "react";
import { Container, Row, Col } from "reactstrap";
import { auth } from "../firebase";
import { deleteSubCollectionDoc } from "../apis/apis";
import { BsFillTrashFill } from "react-icons/bs";

const CurrentItem = ({ currentItemBox }) => {
  const dDay = (day) => {
    const today = new Date().getTime();
    const dDay = Number(day) - today;
    const Day = Math.floor(dDay / (1000 * 60 * 60 * 24)) + 1;
    return Day;
  };

  const deleteTimeItem = async (e) => {
    await deleteSubCollectionDoc("timeitem", auth.currentUser.uid, e.target.id);
  };

  return (
    <Container className="timeItem">
      {currentItemBox &&
        currentItemBox.map((item, i) => {
          return (
            <Row className="item" key={i}>
              <Col xs="7">{item.title}</Col>
              <Col xs="3">D-{dDay(item.content)}</Col>
              <Col xs="2" onClick={deleteTimeItem} id={item.id}>
                <button onClick={deleteTimeItem} id={item.id}>
                <BsFillTrashFill />
                </button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default CurrentItem;
