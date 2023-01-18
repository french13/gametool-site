import React from "react";
import { Container, Row, Col } from "reactstrap";
import { auth } from "../firebase";
import { deleteSubCollectionDoc } from "../apis/apis";

const OverdueItem = ({ overdueItemBox }) => {
  const dDay = (day) => {
    const today = new Date().getTime();
    const dDay = Number(day) - today;
    const Day = Math.floor(dDay / (1000 * 60 * 60 * 24)) + 1;
    return Math.abs(Day);
  };

  const deleteTimeItem = async(e) =>{
    await deleteSubCollectionDoc("timeitem", auth.currentUser.uid, e.target.id)
  }

  return (
    <Container className="currentItem__container">
      {overdueItemBox &&
        overdueItemBox.map((item, i) => {
          return (
            <Row className="item" key={i}>
              <Col xs="7">{item.title}</Col>
              <Col xs="3">D+{dDay(item.content)}</Col>
              <Col xs="2">
                <button onClick={deleteTimeItem} id={item.id}>
 
                </button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default OverdueItem;
