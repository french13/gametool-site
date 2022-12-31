import React from "react";
import { Container, Row, Col } from "reactstrap";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

const CurrentItem = ({ currentItemBox }) => {
  const dDay = (day) => {
    const today = new Date().getTime();
    const dDay = Number(day) - today;
    const Day = Math.floor(dDay / (1000 * 60 * 60 * 24)) + 1;
    return Day;
  };

  const deleteTodo = async (e) => {
    const deleteKey = e.target.id;
    await deleteDoc(
      doc(
        db,
        "timeitem",
        auth.currentUser.uid,
        auth.currentUser.uid,
        String(deleteKey)
      )
    );
  };

  return (
    <Container className="currentItem__container">
      {currentItemBox &&
        currentItemBox.map((item, i) => {
          return (
            <Row className="item" key={i}>
              <Col xs="8">{item.itemName}</Col>
              <Col xs="2">D-{dDay(item.dDay)}</Col>
              <Col xs="2">
                <button onClick={deleteTodo} id={item.id}>
                  삭제
                </button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default CurrentItem;
