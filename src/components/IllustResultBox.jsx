import React, { useEffect, useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { setSubCollectionDoc } from "../apis/apis";
import { Container, Row,Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { addIllust } from "../store";

const IllustResultBox = ({ illustBox }) => {
 const dispatch = useDispatch()


  const addIllust = async (item) => {
    await setSubCollectionDoc(
      "myillust",
      auth.currentUser.uid,
      item.name,
      item.location,
      item.abillity
    ).then(()=>{
      alert('추가 완료')
    })
  };

  return (
    <Container className="illustResult__container">
      {illustBox &&
        illustBox.map((item, i) => {
          return (
            <Row key={i}>
              <Col xs={5}>{item.name}</Col>
              <Col xs={5}>{item.location}</Col>
              <Col xs={2}>
                <button
                  onClick={() => {
                    addIllust(item);
              
                  }}
                >
                  +
                </button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default IllustResultBox;
